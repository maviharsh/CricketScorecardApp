import { GroundModel } from '../../Model/CommunityModels/GroundModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';

export const ground = async (req, res) => {
    const { groundname,personname,address,gmail, city, minfees, maxfees,minboundary,maxboundary, contact, image } = req.body;
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

        const user = await GroundModel.create({
            groundname,
            personname,
            address,
            gmail,
            city,
            minfees,
            maxfees,
            minboundary,
            maxboundary, 
            contact,
            image: imageData,
        });

        return res.status(200).json(user);
    } catch (e) {
        console.error("Error saving to MongoDB:", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};


export const getground=async(req,res)=>{
         GroundModel.find()
         .then((grounds)=>
            {
                res.json(grounds);
            } )      
         .catch((err)=>res.json(err))

}