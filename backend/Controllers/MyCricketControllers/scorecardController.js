
import mongoose from "mongoose";
import { Match } from "../../Model/MyCricketModels/MatchModel.js";
import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { BatterPerformance } from "../../Model/MyCricketModels/BatterPerformanceModel.js";
import { BowlerPerformance } from "../../Model/MyCricketModels/BowlerPerformanceModel.js";
import { Over } from "../../Model/MyCricketModels/OverModel.js";
import { User } from "../../Model/MyCricketModels/UserModel.js";

// --- HELPER FUNCTIONS ---
const calculateStrikeRate = (runs, balls) => (balls > 0 ? (runs / balls) * 100 : 0);
const calculateEconomy = (runs, balls) => (balls > 0 ? (runs / (balls / 6)) : 0);

// --- DEEP POPULATE OPTIONS (CRUCIAL FOR FRONTEND) ---
const deepPopulateOptions = [
    {
        path: 'team1Id',
        populate: { path: 'players', model: 'user', select: 'name' }
    },
    {
        path: 'team2Id',
        populate: { path: 'players', model: 'user', select: 'name' }
    },
    {
        path: 'innings',
        populate: [
            { path: 'battingTeamId', select: 'teamname' },
            { path: 'bowlingTeamId', select: 'teamname' },
            { path: 'batters' }, // Populates BatterPerformance documents
            { path: 'bowlers' }, // Populates BowlerPerformance documents
            {
                path: 'oversList',
                populate: {
                    // Populate details within each delivery if needed
                    path: 'deliveries.batterId deliveries.bowlerId',
                    select: 'playerName'
                }
            }
        ]
    }
];

export const recordDelivery = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { matchId, inningId, batterId, nonStrikerId, bowlerId, runs, isWide, isNoBall, isWicket, wicketDetails } = req.body;

        // --- 1. FETCH ALL DOCUMENTS ---
        const inning = await Innings.findById(inningId).populate('oversList').session(session);
        const batter = await BatterPerformance.findOne({ playerId: batterId, inningId }).session(session);
        const nonStriker = await BatterPerformance.findOne({ playerId: nonStrikerId, inningId }).session(session);
        const bowler = await BowlerPerformance.findOne({ playerId: bowlerId, inningId }).session(session);

        if (!inning || !batter || !nonStriker || !bowler) {
            throw new Error("Could not find all required performance records for this delivery.");
        }

        // --- 2. FIND CURRENT OVER ---
        // Assuming selectNewBowler has already created the new over, so we just find the last one.
        let currentOver = inning.oversList[inning.oversList.length - 1];

        // --- 3. HANDLE DELIVERY LOGIC ---
        let runsOnDelivery = runs;
        let isLegal = true;
        const deliveryData = {
            type: 'run',
            runs: runs,
            batterId: batter._id,
            bowlerId: bowler._id,
            isWide,
            isNoBall,
        };

        // Extras
        if (isWide) {
            runsOnDelivery += 1;
            inning.extra.wides += 1;
            bowler.wides += 1;
            deliveryData.type = 'wide';
            isLegal = false;
        }
        if (isNoBall) {
            runsOnDelivery += 1;
            inning.extra.noBalls += 1;
            bowler.noBalls += 1;
            deliveryData.type = 'noBall';
            isLegal = false;
        }

        // Update totals
        inning.runs += runsOnDelivery;
        // A more complete extras calculation
        inning.extra.total = inning.extra.wides + inning.extra.noBalls + inning.extra.byes + inning.extra.legByes;
        bowler.runsConceded += runsOnDelivery;
        batter.runs += runs;
        if (runs === 4) batter.fours += 1;
        if (runs === 6) batter.sixes += 1;

        // Update balls faced/bowled for legal deliveries
        if (isLegal) {
            batter.ballsFaced += 1;
            bowler.ballsBowled += 1;
            inning.balls += 1;
        }

        // --- 4. HANDLE WICKET ---
        if (isWicket) {
            inning.wickets += 1;
            deliveryData.isWicket = true;
            deliveryData.wicketDetails = wicketDetails;

            const outBatterId = (wicketDetails.type === 'run_out') ? wicketDetails.outPlayerId : batter.playerId;
            const outBatterPerf = await BatterPerformance.findOne({ playerId: outBatterId, inningId }).session(session);

            if (outBatterPerf) {
                outBatterPerf.isOut = true;
                outBatterPerf.outDetails = {
                    type: wicketDetails.type,
                    bowlerId: bowler.playerId,
                };
                if (wicketDetails.type !== 'run_out') {
                    bowler.wickets += 1;
                }
                await outBatterPerf.save({ session });
            }
        }

        // ✅✅✅ --- 5. CORRECTED STRIKE ROTATION LOGIC --- ✅✅✅
        const endOfOver = isLegal && (bowler.ballsBowled % 6 === 0) && bowler.ballsBowled > 0;

        if (isWicket) {
            // No strike rotation needed here; the new batter will come in on strike.
        } else if (endOfOver) {
            // End of an over.
            inning.overs += 1;
            // Strike rotates if an EVEN number of runs were scored on the last ball.
            // If odd runs were scored, batters already crossed and are in position.
            if (runs % 2 === 0) {
                batter.onStrike = false;
                nonStriker.onStrike = true;
            }
        } else if (runs % 2 !== 0) {
            // Mid-over rotation on odd runs.
            batter.onStrike = false;
            nonStriker.onStrike = true;
        }

        // --- 6. UPDATE DERIVED STATS ---
        batter.strikeRate = calculateStrikeRate(batter.runs, batter.ballsFaced);
        bowler.economy = calculateEconomy(bowler.runsConceded, bowler.ballsBowled);

        // --- 7. SAVE EVERYTHING ---
        currentOver.deliveries.push(deliveryData);
        await currentOver.save({ session });
        await Promise.all([inning.save({ session }), batter.save({ session }), nonStriker.save({ session }), bowler.save({ session })]);

        await session.commitTransaction();

        // --- 8. RETURN FULLY POPULATED MATCH ---
        const fullMatchData = await Match.findById(matchId).populate(deepPopulateOptions).lean();
        res.status(200).json(fullMatchData);

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'Failed to record delivery', details: error.message });
    } finally {
        session.endSession();
    }
};