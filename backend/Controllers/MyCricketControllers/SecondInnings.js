import { Innings } from "../../Model/MyCricketModels/InningsModel.js";
import { Match } from "../../Model/MyCricketModels/MatchModel.js";

// router.post('/:matchId/innings') 
export const secondinnings=async (req, res) => {
  try {
    const { inningNumber, battingTeamId, bowlingTeamId } = req.body;
    const match = await Match.findById(req.params.matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    const inning = new Innings({
      matchId: match._id,
      inningNumber,
      battingTeamId,
      bowlingTeamId,
    });
    await inning.save();
    res.json(inning);
  } catch (error) {
    console.error('Error creating inning:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



