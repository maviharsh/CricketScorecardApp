import { Innings } from "../../Model/MyCricketModels/InningsModel.js";

// GET /innings/:id
export const getinnings=async (req, res) => {
  try {
    const inning = await Innings.findById(req.params.id)
      .populate('batters')
      .populate('bowlers')
      .populate('oversList');
    if (!inning) {
      return res.status(404).json({ error: 'Inning not found' });
    }
    res.json(inning);
  } catch (error) {
    console.error('Error fetching inning:', error);
    res.status(500).json({ error: 'Server error' });
  }
};