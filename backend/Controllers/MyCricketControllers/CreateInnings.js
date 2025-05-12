import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { Match } from "../../Model/MyCricketModels/MatchModel.js";

export const createinnings = async (req, res) => {
  try {
    console.log("Received matchId:", req.params.matchId); // Add logging
    const { tossWinner, decision, inning } = req.body;
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    // Update match with toss details
    match.tossWinner = tossWinner;
    match.tossDecision = decision;
    match.status = 'ongoing';
    match.updatedAt = Date.now();
    await match.save();

    // Create first inning
    const newInning = new Innings({
      matchId: match._id,
      inningNumber: inning.inningNumber,
      battingTeamId: inning.battingTeamId,
      bowlingTeamId: inning.bowlingTeamId,
    });
    await newInning.save();

    res.json({ match, inning: newInning });
  } catch (error) {
    console.error('Error processing toss:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
