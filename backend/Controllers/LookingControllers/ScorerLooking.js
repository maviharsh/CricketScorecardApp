import { ScorerLookingModel } from '../../Model/LookingModels/ScorerLookingModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';

export const scorer = async (req, res) => {
    const { date,address,city,contact, image } = req.body;
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

        const user = await ScorerLookingModel.create({
            name:"Scorers",
            date,
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


export const getscorer=async(req,res)=>{
         ScorerLookingModel.find()
         .then((scorers)=>
            {
                res.json(scorers);
            } )      
         .catch((err)=>res.json(err))

}