import jwt from "jsonwebtoken";
import { User } from '../../Model/MyCricketModels/UserModel.js';

export const AuthStatus = async (req, res) => {
   try {
       const token = req.cookies?.token;
       if (!token) {
           return res.status(401).json({ message: "Token not found" });
       }

       let decodedUser;
       try {
           decodedUser = jwt.verify(token, process.env.JWT_SECRET);
       } catch (err) {
        console.log(err);
           return res.status(401).json({ message: "Invalid token" })
       }

       console.log("Decoded User:", decodedUser);

       const user = await User.findOne({ email: decodedUser.email });
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }   
       console.log(user);
       return res.status(200).json({name:user.name,image:user.image});
   } catch (err) {
       console.error("AuthStatus Error:", err);
       return res.status(500).json({ message: "Server error" });
   }
};
