import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { Over } from "../../Model/MyCricketModels/OverModel.js";

export const createover=async(req,res)=>{
    try {
    const { matchId, overNumber, bowlerId } = req.body;
    const inningId=req.params.inningId;
    if (!matchId || !inningId || !overNumber || !bowlerId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const over = new Over({
      matchId,
      inningId,
      overNumber,
      bowlerId,
    });
    await over.save();
    await Innings.findByIdAndUpdate(inningId, { $push: { oversList: over._id } });
    res.status(201).json(over);
  } catch (error) {
    console.error('Error creating over:', error);
    res.status(500).json({ error: 'Server error' });
  }
};