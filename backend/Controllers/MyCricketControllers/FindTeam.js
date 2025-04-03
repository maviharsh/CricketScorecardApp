import { Team } from "../../Model/MyCricketModels/TeamModel.js"; // ✅ Ensure this import exists

export const findteam = async (req, res) => {
    try {
        console.log("Received Cookies:", req.cookies);
        console.log("Received Headers:", req.headers);
        console.log("Received Body:", req.body);

        if (!Team) {
            console.error("Team model is not imported correctly.");
            return res.status(500).json({ error: "Internal Server Error: Model Not Found" });
        }

        const teams = await Team.find({ teamname: req.body.teamname });

        if (teams.length === 0) {
            console.log('TEAM NOT FOUND');
            return res.status(404).json({ error: "Could Not Find Team" });
        }

        console.log("Team Was Found", teams);
        return res.status(200).json(teams);
    } catch (err) {
        console.log('GOT ERROR:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
