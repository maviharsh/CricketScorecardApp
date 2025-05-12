import { BowlerPerformance } from "../../Model/MyCricketModels/BowlerPerformanceModel.js";
import { Innings } from "../../Model/MyCricketModels/InningsModel.js";

export const createbowler = async (req, res) => {
  try {
    const { matchId, playerId } = req.body;
    const inningId = req.params.inningId;

    if (!matchId || !inningId || !playerId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const bowler = new BowlerPerformance({
      matchId,
      inningId,
      playerId,
    });

    await bowler.save();
    await Innings.findByIdAndUpdate(inningId, { $push: { bowlers: bowler._id } });

    res.status(201).json(bowler);
  } catch (error) {
    console.error('Error creating bowler:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
