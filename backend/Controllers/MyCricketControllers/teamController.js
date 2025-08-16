// teamController.js
import { Team } from "../../Model/MyCricketModels/TeamModel.js";
import { User } from "../../Model/MyCricketModels/UserModel.js";
import mongoose from "mongoose";

export const addTeam = async (req, res) => {
    try {
        const { teamname, captainId, city, playerIds } = req.body; // Expect IDs now

        if (!teamname || !captainId || !city || !playerIds || playerIds.length < 2) {
            return res.status(400).json({ error: "Team name, city, captain, and at least 2 player IDs are required." });
        }

        const alreadyExists = await Team.findOne({ teamname });
        if (alreadyExists) {
            return res.status(409).json({ error: "A team with this name already exists." });
        }

        // Verify captain exists
        const captain = await User.findById(captainId);
        if (!captain) {
            return res.status(404).json({ error: "Captain specified does not exist as a user." });
        }
        
        const newTeam = await Team.create({
            teamname,
            captainId,
            city,
            players: playerIds,
        });

        return res.status(201).json(newTeam);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

export const findTeam = async (req, res) => {
    try {
        console.log("enter");
        const { teamname } = req.body;
        console.log(teamname);

        const team = await Team.findOne({ teamname }); // Use findOne for a single result

        if (!team) {
            return res.status(404).json({ error: "Could not find team." });
        }
        return res.status(200).json(team);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};