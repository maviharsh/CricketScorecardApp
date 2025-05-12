import mongoose from "mongoose";
import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { BatterPerformance } from "../../Model/MyCricketModels/BatterPerformanceModel.js";

export const createbatter = async (req, res) => {
  try {
    const { matchId, playerId, battingOrder, onStrike } = req.body;
    const inningId = req.params.inningId;

    if (
      matchId === undefined ||
      inningId === undefined ||
      playerId === undefined ||
      battingOrder === undefined ||
      onStrike === undefined
    ) {
      return res.status(400).json({
        error: "All fields are required",
        missing: {
          matchId: matchId === undefined,
          inningId: inningId === undefined,
          playerId: playerId === undefined,
          battingOrder: battingOrder === undefined,
          onStrike: onStrike === undefined,
        },
      });
    }
    if (
      !mongoose.isValidObjectId(matchId) ||
      !mongoose.isValidObjectId(inningId)
    ) {
      return res.status(400).json({
        error: "Invalid matchId or inningId",
        details: {
          matchId: mongoose.isValidObjectId(matchId) ? "Valid" : "Invalid",
          inningId: mongoose.isValidObjectId(inningId) ? "Valid" : "Invalid",
        },
      });
    }

    const inning = await Innings.findById(inningId);
    if (!inning) {
      return res.status(404).json({ error: "Inning not found" });
    }

    const existingBatter = await BatterPerformance.findOne({
      inningId,
      playerId,
    });
    if (existingBatter) {
      return res
        .status(400)
        .json({ error: `Batter ${playerId} already exists in this inning` });
    }

    const batter = new BatterPerformance({
      matchId,
      inningId,
      playerId,
      battingOrder,
      onStrike: !!onStrike,
    });
    await batter.save();

    await Innings.findByIdAndUpdate(inningId, {
      $push: { batters: batter._id },
    });

    res.status(201).json(batter);
  } catch (error) {
    console.error("Error creating batter:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
