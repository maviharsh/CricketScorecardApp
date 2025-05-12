import { BatterPerformance } from "../../Model/MyCricketModels/BatterPerformanceModel.js";

export const updatebatterperformance=async(req,res)=>{
    try {
    const { runs, ballsFaced, out } = req.body;
    const updateData = {};
    if (runs !== undefined) updateData.runs = runs;
    if (ballsFaced !== undefined) updateData.ballsFaced = ballsFaced;
    if (out !== undefined) updateData.out = out;
    updateData.updatedAt = Date.now();

    const batter = await BatterPerformance.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!batter) {
      return res.status(404).json({ error: 'Batter not found' });
    }
    res.json(batter);
  } catch (error) {
    console.error('Error updating batter:', error);
    res.status(500).json({ error: 'Server error' });
  }
}