import { Innings } from "../../Model/MyCricketModels/InningsModel.js";

// PUT /innings/:id
export const updateinnings=async (req, res) => {
  try {
    const { runs, wickets, overs, balls, extras } = req.body;
    const updateData = {};
    if (runs !== undefined) updateData.runs = runs;
    if (wickets !== undefined) updateData.wickets = wickets;
    if (overs !== undefined) updateData.overs = overs;
    if (balls !== undefined) updateData.balls = balls;
    if (extras) updateData.extras = extras;
    updateData.updatedAt = Date.now();

    const inning = await Innings.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!inning) {
      return res.status(404).json({ error: 'Inning not found' });
    }
    res.json(inning);
  } catch (error) {
    console.error('Error updating inning:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
