import { Match } from "../../Model/MyCricketModels/MatchModel.js";

export const creatematch = async (req, res) => {
  try {
    if (!Match) {
      console.error("Match model is not imported correctly.");
      return res
        .status(500)
        .json({ error: "Internal Server Error: Model Not Found" });
    }

    const { team1Id, team2Id, maxOvers, startDate, matchTime, ground, city } =
      req.body;
    if (
      !team1Id ||
      !team2Id ||
      !maxOvers ||
      !startDate ||
      !matchTime ||
      !ground ||
      !city
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const match = new Match({
      team1Id,
      team2Id,
      maxOvers,
      startDate,
      matchTime,
      ground,
      city,
    });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    console.log("GOT ERROR:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
