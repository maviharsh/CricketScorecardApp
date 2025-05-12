import { BowlerPerformance } from "../../Model/MyCricketModels/BowlerPerformanceModel.js";

export const updatebowlerperformance=async(req,res)=>{
try {
    const { runsConceded, wickets, ballsBowled } = req.body;
    const updateData = {};
    if (runsConceded !== undefined) updateData.runsConceded = runsConceded;
    if (wickets !== undefined) updateData.wickets = wickets;
    if (ballsBowled !== undefined) updateData.ballsBowled = ballsBowled;
    updateData.updatedAt = Date.now();

    const bowler = await BowlerPerformance.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!bowler) {
      return res.status(404).json({ error: 'Bowler not found' });
    }
    res.json(bowler);
  } catch (error) {
    console.error('Error updating bowler:', error);
    res.status(500).json({ error: 'Server error' });
  }
}