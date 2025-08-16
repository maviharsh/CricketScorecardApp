import { User } from "../../Model/MyCricketModels/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined,
  path: "/",
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ error: "Email or password is incorrect" });
    }

    const ismatch = await bcrypt.compare(password, user.password);

    if (!ismatch) {
      console.log("wrong password");
      return res.status(401).json({ error: "Email or password is incorrect" }); // Added return here
    } else {
      console.log("correct password");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Good practice: add an expiration to your token
      });
      console.log(token);

       res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000, // 1h
    });

      res.status(200).json("login successful");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {

    res.clearCookie("token", cookieOptions);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    // This status code was wrong, changed to 500 for server error
    res.status(500).json({ error: "Error during logout" });
  }
};
