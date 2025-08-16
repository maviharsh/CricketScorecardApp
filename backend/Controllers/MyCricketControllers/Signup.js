import { User } from '../../Model/MyCricketModels/UserModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { name, role, dob, contact, email, password, image } = req.body;

    try {
        const duplicateemail = await User.exists({ email: email });
        const duplicatenumber = await User.exists({ contact: contact });

        if (duplicateemail) {
            console.log("Signup failed: User with this email already exists");
            return res.status(400).json({ error: "User with this email already exists" });
        } else if (duplicatenumber) {
            console.log("Signup failed: User with this number already exists");
            return res.status(400).json({ error: "User with this number already exists" });
        } else {
            let imageData = {};
            // It's generally better to handle image upload via multer or express-fileupload
            // if it's coming as a file. If 'image' is a base64 string, this is fine.
            if (image) {
                const results = await uploadToCloudinary(image, "uploads");
                console.log("Cloudinary Results:", results); // Debugging
                // Ensure results has 'url' and 'public_id' or similar properties
                // based on your uploadToCloudinary implementation.
                if (!results || !results.url || !results.public_id) {
                    console.error("Cloudinary upload failed: Missing URL or Public ID");
                    return res.status(500).json({ error: "Image upload failed. Please try again." });
                }
                imageData = {
                    url: results.url,
                    publicId: results.public_id,
                };
            } else {
                // Consider if image is always mandatory. If not, remove this error.
                return res.status(400).json({ error: "Image is required for signup." });
            }

            console.log("Image Data:", imageData); // Debugging

            const hashedpassword = await bcrypt.hash(password, 10);

            const user = await User.create({ // Await the create call
                name,
                role,
                dob,
                email,
                contact,
                password: hashedpassword,
                image: imageData,
            });

            console.log("Document saved:", user); // Log the created user for confirmation

            // Sign JWT token with an expiration
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Token expires in 1 hour
            });
            console.log("Generated Token:", token);

            // --- CRITICAL FIXES FOR RENDER COOKIE ---
            res.cookie("token", token, {
                httpOnly: true,     // Prevents client-side JS access (Good)
                secure: true,       // **MUST BE TRUE FOR HTTPS (Render)**
                sameSite: "None",   // **MUST BE "None" FOR CROSS-SITE COOKIES**
                // domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined,
                maxAge: 60 * 60 * 1000, // Matches JWT expiration (1 hour in milliseconds)
                // path: '/', // Often good practice to explicitly set path
            });
            // --- END CRITICAL FIXES ---

            // Send back necessary user info, but typically not the password hash
            return res.status(200).json({
                message: "Signup successful!",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    // Add other non-sensitive user data you want to send back
                }
            });
        }

    } catch (e) {
        console.error("Error during signup:", e); // Use console.error for errors
        // Provide more user-friendly error messages if possible
        res.status(500).json({ error: "A server error occurred during signup." });
    }
};
