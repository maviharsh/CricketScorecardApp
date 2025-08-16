// src/Controllers/MyCricketControllers/undoController.js

import mongoose from "mongoose";
import { Match } from "../../Model/MyCricketModels/MatchModel.js";
import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { BatterPerformance } from "../../Model/MyCricketModels/BatterPerformanceModel.js";
import { BowlerPerformance } from "../../Model/MyCricketModels/BowlerPerformanceModel.js";
import { Over } from "../../Model/MyCricketModels/OverModel.js";

// --- HELPER FUNCTIONS ---
const calculateStrikeRate = (runs, balls) => (balls > 0 ? (runs / balls) * 100 : 0);
const calculateEconomy = (runs, balls) => (balls > 0 ? (runs / (balls / 6)) : 0);

// Re-using the same deep populate options
const deepPopulateOptions = [ /* ... copy from scorecardController ... */ ];


export const undoLastDelivery = async (req, res) => {
    const { inningId } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const inning = await Innings.findById(inningId).populate('oversList').session(session);
        if (!inning) throw new Error("Inning not found.");

        // --- 1. FIND THE LAST DELIVERY ---
        const lastOverWithDelivery = [...inning.oversList].reverse().find(o => o.deliveries.length > 0);
        if (!lastOverWithDelivery) {
            throw new Error("No deliveries to undo in this inning.");
        }
        const lastDelivery = lastOverWithDelivery.deliveries.pop();

        // --- 2. FETCH CORRESPONDING DOCUMENTS ---
        const batter = await BatterPerformance.findById(lastDelivery.batterId).session(session);
        const bowler = await BowlerPerformance.findById(lastDelivery.bowlerId).session(session);

        if (!batter || !bowler) {
            throw new Error("Could not find batter or bowler performance for the delivery to undo.");
        }

        // --- 3. REVERSE STATS ---
        let runsToReverse = lastDelivery.runs;
        let wasLegal = true;

        if (lastDelivery.isWide) {
            runsToReverse += 1;
            inning.extra.wides -= 1;
            bowler.wides -= 1;
            wasLegal = false;
        }
        if (lastDelivery.isNoBall) {
            runsToReverse += 1;
            inning.extra.noBalls -= 1;
            bowler.noBalls -= 1;
            wasLegal = false;
        }

        inning.runs -= runsToReverse;
        inning.extra.total = inning.extra.wides + inning.extra.noBalls;
        bowler.runsConceded -= runsToReverse;
        batter.runs -= lastDelivery.runs;
        if (lastDelivery.runs === 4) batter.fours -= 1;
        if (lastDelivery.runs === 6) batter.sixes -= 1;

        if (wasLegal) {
            batter.ballsFaced -= 1;
            bowler.ballsBowled -= 1;
            inning.balls -= 1;
        }

        // --- 4. REVERSE WICKET ---
        if (lastDelivery.isWicket) {
            inning.wickets -= 1;
            const wicketDetails = lastDelivery.wicketDetails;

            const outBatterId = (wicketDetails.type === 'run_out') ? wicketDetails.outPlayerId : batter.playerId;
            const outBatterPerf = await BatterPerformance.findOne({ playerId: outBatterId, inningId }).session(session);

            if (outBatterPerf) {
                outBatterPerf.isOut = false;
                outBatterPerf.outDetails = {}; // Clear details
                await outBatterPerf.save({ session });
            }

            if (wicketDetails.type !== 'run_out') {
                bowler.wickets -= 1;
            }
        }
        
        // --- 5. REVERSE STRIKE ROTATION ---
        const wasEndOfOver = wasLegal && (bowler.ballsBowled % 6 === 0);
        const didRotate = (lastDelivery.runs % 2 !== 0 && !wasEndOfOver) || (lastDelivery.runs % 2 === 0 && wasEndOfOver);

        if (didRotate && !lastDelivery.isWicket) {
             // Find the player who is now on strike and swap them back
            const currentStriker = await BatterPerformance.findOne({ inningId, onStrike: true, _id: { $ne: batter._id } }).session(session);
            if (currentStriker) {
                batter.onStrike = true;
                currentStriker.onStrike = false;
                await currentStriker.save({ session });
            }
        }
        
        // If the undone delivery was the last ball of an over, decrement inning.overs
        if (wasEndOfOver) {
            inning.overs -= 1;
            // Also revert the mandatory end-of-over strike swap
             const nonStriker = await BatterPerformance.findOne({ inningId, onStrike: false, isOut: false }).session(session);
             if (nonStriker) {
                 batter.onStrike = !batter.onStrike;
                 nonStriker.onStrike = !nonStriker.onStrike;
                 await nonStriker.save({session});
             }
        }

        // --- 6. RECALCULATE & SAVE ---
        batter.strikeRate = calculateStrikeRate(batter.runs, batter.ballsFaced);
        bowler.economy = calculateEconomy(bowler.runsConceded, bowler.ballsBowled);

        await Promise.all([inning.save({ session }), lastOverWithDelivery.save({ session }), batter.save({ session }), bowler.save({ session })]);
        await session.commitTransaction();

        // --- 7. RETURN FULLY POPULATED MATCH ---
        const fullMatchData = await Match.findById(inning.matchId).populate(deepPopulateOptions).lean();
        res.status(200).json(fullMatchData);

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: "Failed to undo last delivery", details: error.message });
    } finally {
        session.endSession();
    }
};