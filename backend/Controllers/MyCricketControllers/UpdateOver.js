import { Over } from "../../Model/MyCricketModels/OverModel.js";

export const updateover= async (req, res) => {
  try {
    const { runs, deliveries } = req.body;
    const updateData = {};
    if (runs !== undefined) updateData.runs = runs;
    if (deliveries) updateData.deliveries = deliveries;

    const over = await Over.findByIdAndUpdate(req.params.overId, updateData, { new: true });
    if (!over) {
      return res.status(404).json({ error: 'Over not found' });
    }
    res.json(over);
  } catch (error) {
    console.error('Error updating over:', error);
    res.status(500).json({ error: 'Server error' });
  }
};