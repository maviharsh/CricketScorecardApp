import { User } from '../../Model/MyCricketModels/UserModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';
import bcrypt from "bcrypt";


export const user = async (req, res) => {
    const { name,role,dob,contact,email,password, image } = req.body;
    
    try {
    const duplicateemail=await User.exists( {email: email} );  
    const duplicatenumber=await User.exists({contact:contact});    
    if(duplicateemail)
    {
        console.log("not saved");
        return res.status(400).json({error:"User with this email already exists"});
    }
    else if(duplicatenumber)
    {
        console.log("not saved");
        return res.status(400).json({error:"User with this number already exists"});
    }
    else{
        let imageData = {};
        if (image) {
            const results = await uploadToCloudinary(image, "uploads");
            console.log("Cloudinary Results:", results); // Debugging
            imageData = {
                url: results.url, // Ensure this field exists
                publicId: results.publicId, // Ensure this field exists
            };
        } else {
            throw new Error("Image is required but not provided");
        }

        console.log("Image Data:", imageData); // Debugging
       
        const hashedpassword = await bcrypt.hash(password, 10);
       
        const user = User.create({
            name,
            role,
            dob,
            email,
            contact,
            password:hashedpassword,
            image: imageData,
        });
       
        console.log("document saved");
        return res.status(200).json(user);
    }
        
    } catch (e) {
        console.error("Error saving to MongoDB:", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};

