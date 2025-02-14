import { OpponentModel } from '../../Model/LookingModels/OpponentModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';

export const opponent = async (req, res) => {
    const { date,time,address,city,contact, image } = req.body;
    try {
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

        const user = await OpponentModel.create({
            name:"Opponents",
            date,
            time,
            address,
            city,
            contact,
            image: imageData,
        });

        return res.status(200).json(user);
    } catch (e) {
        console.error("Error saving to MongoDB:", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};


export const getopponent=async(req,res)=>{
         OpponentModel.find()
         .then((opponents)=>
            {
                res.json(opponents);
            } )      
         .catch((err)=>res.json(err))
}