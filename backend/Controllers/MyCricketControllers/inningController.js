import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { BatterPerformance } from "../../Model/MyCricketModels/BatterPerformanceModel.js";
import { BowlerPerformance } from "../../Model/MyCricketModels/BowlerPerformanceModel.js";
import { User } from "../../Model/MyCricketModels/UserModel.js";
import { Over } from "../../Model/MyCricketModels/OverModel.js";
import { Match } from "../../Model/MyCricketModels/MatchModel.js";
import mongoose from "mongoose";

const fullPopulationChain = [
    {
        path: "team1Id",
        populate: { path: "players", model: "user" },
    },
    {
        path: "team2Id",
        populate: { path: "players", model: "user" },
    },
    {
        path: "innings",
        populate: [
            { path: "battingTeamId" },
            { path: "bowlingTeamId" },
            // ✅ All 'model' properties removed from here
            { path: "batters" },
            { path: "bowlers" },
            { path: "oversList" },
        ],
    },
];

// This function will set up the opening players for an inning
export const setupInning = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let committedInning;

    try {
        const { inningId } = req.params;
        const { strikerId, nonStrikerId, bowlerId } = req.body;

        if (!strikerId || !nonStrikerId || !bowlerId) {
            throw new Error("Striker, non-striker, and bowler are required.");
        }

        const inning = await Innings.findById(inningId).session(session);
        if (!inning) {
            throw new Error("Inning not found.");
        }

        const [strikerUser, nonStrikerUser, bowlerUser] = await Promise.all([
            User.findById(strikerId).session(session),
            User.findById(nonStrikerId).session(session),
            User.findById(bowlerId).session(session),
        ]);

        if (!strikerUser || !nonStrikerUser || !bowlerUser) {
            throw new Error("One or more players not found.");
        }

        const strikerPerf = new BatterPerformance({ matchId: inning.matchId, inningId, playerId: strikerId, playerName: strikerUser.name, battingOrder: 1, onStrike: true });
        const nonStrikerPerf = new BatterPerformance({ matchId: inning.matchId, inningId, playerId: nonStrikerId, playerName: nonStrikerUser.name, battingOrder: 2, onStrike: false });
        const bowlerPerf = new BowlerPerformance({ matchId: inning.matchId, inningId, playerId: bowlerId, playerName: bowlerUser.name });
        const firstOver = new Over({ matchId: inning.matchId, inningId, overNumber: 1, bowlerId: bowlerId, bowlerName: bowlerUser.name });

        await Promise.all([
            strikerPerf.save({ session }),
            nonStrikerPerf.save({ session }),
            bowlerPerf.save({ session }),
            firstOver.save({ session }),
        ]);

        inning.batters.push(strikerPerf._id, nonStrikerPerf._id);
        inning.bowlers.push(bowlerPerf._id);
        inning.oversList.push(firstOver._id);
        await inning.save({ session });

        committedInning = inning;
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error during inning setup transaction", details: error.message });
    }

    session.endSession();

    try {
        const fullMatchData = await Match.findById(committedInning.matchId).populate(fullPopulationChain);
        return res.status(200).json(fullMatchData);
    } catch (error) {
        return res.status(500).json({ error: "Data committed, but failed to fetch final match state.", details: error.message });
    }
};

export const selectNewBatter = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let committedInning;

    try {
        const { inningId } = req.params;
        const { newBatterId, outBatterId } = req.body;

        const inning = await Innings.findById(inningId).session(session);
        if (!inning) throw new Error("Inning not found.");

        const outBatterPerf = await BatterPerformance.findOne({ playerId: outBatterId, inningId }).session(session);
        if (outBatterPerf) {
            outBatterPerf.onStrike = false;
            await outBatterPerf.save({ session });
        }

        const newBatterUser = await User.findById(newBatterId).session(session);
        if(!newBatterUser) throw new Error("New batter not found.");

        const nextBattingOrder = inning.batters.length + 1;
        const newBatterPerf = new BatterPerformance({
            matchId: inning.matchId,
            inningId,
            playerId: newBatterId,
            playerName: newBatterUser.name,
            battingOrder: nextBattingOrder,
            onStrike: true,
        });
        await newBatterPerf.save({ session });

        inning.batters.push(newBatterPerf._id);
        await inning.save({ session });

        committedInning = inning;
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error selecting new batter", details: error.message });
    }

    session.endSession();

    try {
        const fullMatchData = await Match.findById(committedInning.matchId).populate(fullPopulationChain);
        return res.status(200).json(fullMatchData);
    } catch (error) {
        return res.status(500).json({ error: "Data committed, but failed to fetch final match state.", details: error.message });
    }
};

export const selectNewBowler = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    let committedInning;

    try {
        const { inningId } = req.params;
        const { newBowlerId } = req.body;

        const inning = await Innings.findById(inningId).session(session);
        if (!inning) throw new Error("Inning not found.");

        const bowlerUser = await User.findById(newBowlerId).session(session);
        if (!bowlerUser) throw new Error("New bowler not found.");

        let bowlerPerf = await BowlerPerformance.findOne({ playerId: newBowlerId, inningId }).session(session);
        if (!bowlerPerf) {
            bowlerPerf = new BowlerPerformance({
                matchId: inning.matchId,
                inningId,
                playerId: newBowlerId,
                playerName: bowlerUser.name,
            });
            await bowlerPerf.save({ session });
            inning.bowlers.push(bowlerPerf._id);
        }

        const newOver = new Over({
            matchId: inning.matchId,
            inningId,
            overNumber: inning.overs + 1,
            bowlerId: newBowlerId,
            bowlerName: bowlerUser.name,
        });
        await newOver.save({ session });

        inning.oversList.push(newOver._id);
        await inning.save({ session });

        committedInning = inning;
        await session.commitTransaction();

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: "Server error selecting new bowler", details: error.message });
    }
    
    session.endSession();
    
    try {
        const fullMatchData = await Match.findById(committedInning.matchId).populate(fullPopulationChain);
        return res.status(200).json(fullMatchData);
    } catch (error) {
        return res.status(500).json({ error: "Data committed, but failed to fetch final match state.", details: error.message });
    }
};