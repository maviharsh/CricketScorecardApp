// playerController.js
import { User } from "../../Model/MyCricketModels/UserModel.js";

// Find by contact number
export const findPlayersByContact = async (req, res) => {
    try {
        const { number } = req.body;
        if (!number) {
            return res.status(400).json({ error: "Player contact number is required." });
        }
        const user = await User.findOne({ contact: number });
        if (!user) {
            return res.status(404).json({ error: "Player with that contact not found." });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ NEW: Find player by name (for autosuggest)
export const findPlayersByName = async (req, res) => {
    try {
        const { name } = req.query; // Search via query string like /api/players/search?name=John
        if (!name) {
            return res.status(400).json({ error: "Player name query is required." });
        }
        const users = await User.find({ name: new RegExp(name, 'i') }).limit(10); // Case-insensitive search
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
