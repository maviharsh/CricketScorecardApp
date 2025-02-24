import { User } from '../../Model/MyCricketModels/UserModel.js';
import jwt from "jsonwebtoken";

export const user = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "User is not logged in" });
        }

        let decodedUser;
        try {
            decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const data = await User.findOne({ email: decodedUser.email }).select('-password');
        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(data);
    } catch (e) {
        console.error("Error", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};
