import { User } from "../../Model/MyCricketModels/UserModel.js"; 

export const findplayers = async (req, res) => {
    try {
        console.log("Received Cookies:", req.cookies);
        console.log("Received Headers:", req.headers);
        console.log("Received Body:", req.body);

        if (!User) {
            console.error("User model is not imported correctly.");
            return res.status(500).json({ error: "Internal Server Error: Model Not Found" });
        }

        const users = await User.findOne({ contact: req.body.number });

        if (!users) {
            console.log('USER NOT FOUND');
            return res.status(404).json({ error: "Could Not Find Team" });
        }

        console.log("Team Was Found", users);
        return res.status(200).json(users);
    } catch (err) {
        console.log('GOT ERROR:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
