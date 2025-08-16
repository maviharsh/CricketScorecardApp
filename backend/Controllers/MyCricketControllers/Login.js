import { User } from "../../Model/MyCricketModels/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

      // --- CRITICAL FIXES FOR RENDER ---
      res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JS access (Good)
        secure: true,   // **MUST BE TRUE FOR HTTPS (Render)**
        sameSite: "None", // **MUST BE "None" FOR CROSS-SITE COOKIES (Frontend/Backend on different Render subdomains)**
        // domain: '.onrender.com', // **RECOMMENDED: Sets the cookie for all .onrender.com subdomains**
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds (Matches JWT expiry)
        // You might also want to set a path if your API is under a specific path, e.g., path: '/'
      });
      // --- END CRITICAL FIXES ---

      res.status(200).json("login successful");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // --- CRITICAL FIXES FOR RENDER ---
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,   // **MUST BE TRUE FOR HTTPS (Render)**
      sameSite: "None", // **MUST BE "None" FOR CROSS-SITE COOKIES**
      // domain: '.onrender.com', // **RECOMMENDED: Match the domain used in login**
    });
    // --- END CRITICAL FIXES ---

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    // This status code was wrong, changed to 500 for server error
    res.status(500).json({ error: "Error during logout" });
  }
};