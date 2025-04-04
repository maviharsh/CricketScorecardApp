import { User } from "../../Model/MyCricketModels/UserModel.js"; 

export const findplayers = async (req, res) => {
    try {
       
        if (!User) {
            console.error("User model is not imported correctly.");
            return res.status(500).json({ error: "Internal Server Error: Model Not Found" });
        }

        const user = await User.findOne({ contact: req.body.number });

        if (!user) {
            console.log('USER NOT FOUND');
            return res.status(404).json({ error: "Could Not Find Team" });
        }

        console.log("Player Was Found", user);
        return res.status(200).json(user);
    } catch (err) {
        console.log('GOT ERROR:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
