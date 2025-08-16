import { Match } from "../../Model/MyCricketModels/MatchModel.js";
import { Team } from "../../Model/MyCricketModels/TeamModel.js";
import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import mongoose from "mongoose";

// ✅ Define a consistent population chain to be reused
const fullPopulationChain = [
    {
        path: "team1Id",
        populate: { path: "players", model: "user", select: "name" },
    },
    {
        path: "team2Id",
        populate: { path: "players", model: "user", select: "name" },
    },
    {
        path: "innings",
        populate: [
            { path: "battingTeamId", select: "teamname" },
            { path: "bowlingTeamId", select: "teamname" },
            { path: "batters" },
            { path: "bowlers" },
            { path: "oversList" },
        ],
    },
];

// GET /api/matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find({})
      .populate("team1Id", "teamname")
      .populate("team2Id", "teamname")
      .sort({ createdAt: -1 });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: "Server error getting matches" });
  }
};

// GET /api/matches/:id
export const getMatchById = async (req, res) => {
    try {
        // This function already uses a correct population chain. No changes needed.
        const match = await Match.findById(req.params.id).populate(fullPopulationChain);

        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: "Server error getting match", details: error.message });
    }
};

// POST /api/matches
export const createMatch = async (req, res) => {
  try {
    const { team1Id, team2Id, maxOvers, startDate, matchTime, ground, city } =
      req.body;

    if (
      !team1Id ||
      !team2Id ||
      !maxOvers ||
      !startDate ||
      !matchTime ||
      !ground ||
      !city
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required to create a match." });
    }

    if (team1Id === team2Id) {
      return res
        .status(400)
        .json({ error: "A team cannot play against itself." });
    }

    const team1 = await Team.findById(team1Id);
    const team2 = await Team.findById(team2Id);

    if (!team1 || !team2) {
      return res
        .status(404)
        .json({
          error: "One or both of the selected teams could not be found.",
        });
    }

    const match = new Match({
      team1Id,
      team2Id,
      maxOvers,
      startDate,
      matchTime,
      ground,
      city,
    });
    await match.save();

    res.status(201).json(match);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

// POST /api/matches/:matchId/toss
export const processToss = async (req, res) => {
    try {
        const { tossWinnerId, decision } = req.body;
        const { matchId } = req.params;

        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({ error: "Match not found" });
        }
        if (match.status !== 'scheduled') {
             return res.status(400).json({ error: "Toss has already been processed for this match." });
        }

        let battingTeamId, bowlingTeamId;

        // Determine batting and bowling teams based on the toss decision
        if (decision === "bat") {
            battingTeamId = tossWinnerId;
            bowlingTeamId =
                match.team1Id.toString() === tossWinnerId
                    ? match.team2Id
                    : match.team1Id;
        } else { // decision === "bowl"
            bowlingTeamId = tossWinnerId;
            battingTeamId =
                match.team1Id.toString() === tossWinnerId
                    ? match.team2Id
                    : match.team1Id;
        }

        // Update match details
        match.tossWinnerId = tossWinnerId;
        match.tossDecision = decision;
        match.status = "ongoing";

        // Create the first inning record
        const firstInning = new Innings({
            matchId: match._id,
            inningNumber: 1,
            battingTeamId: battingTeamId,
            bowlingTeamId: bowlingTeamId,
        });
        await firstInning.save();

        // Link the new inning to the match
        match.innings.push(firstInning._id);
        await match.save();

        // ✅ KEY CORRECTION: Fetch the match again using the complete,
        // consistent population chain before sending it to the client.
        const populatedMatch = await Match.findById(matchId).populate(fullPopulationChain);

        res.status(200).json(populatedMatch);

    } catch (error) {
        res.status(500).json({ error: "Server error processing toss", details: error.message });
    }
};


// To create the second innings
// To create the second innings
export const startSecondInning = async (req, res) => {
    const { matchId } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const match = await Match.findById(matchId).populate('innings').session(session);
        if (!match) return res.status(404).json({ error: "Match not found." });
        if (match.innings.length >= 2) return res.status(400).json({ error: "Second innings has already started." });

        const firstInning = match.innings[0];

        const secondInning = new Innings({
            matchId: match._id,
            inningNumber: 2,
            battingTeamId: firstInning.bowlingTeamId,
            bowlingTeamId: firstInning.battingTeamId,
        });
        await secondInning.save({ session });

        match.innings.push(secondInning._id);
        await match.save({ session });

        await session.commitTransaction();
        
        // ✅ CORRECTION: Replaced the placeholder comment with the actual deep population
        // to ensure the frontend receives the complete and correct new match state.
        const fullMatchData = await Match.findById(matchId).populate(fullPopulationChain);
        res.status(200).json(fullMatchData);

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: "Server error starting second innings", details: error.message });
    } finally {
        session.endSession();
    }
};

// To set the final match result
export const completeMatch = async (req, res) => {
    const { matchId } = req.params;
    const { result, winnerId } = req.body;
    try {
        const match = await Match.findByIdAndUpdate(
            matchId,
            {
                status: 'completed',
                result: result,
                winnerId: winnerId,
            },
            { new: true }
        );

        if (!match) return res.status(404).json({ error: "Match not found." });

        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ error: "Server error completing match", details: error.message });
    }
};
