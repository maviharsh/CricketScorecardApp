import {TShirtModel} from '../../Model/CommunityModels/TShirtModel.js';
import { uploadToCloudinary } from '../../Services/cloudinary.js';

export const tshirt = async (req, res) => {
    const { companyname,personname,address, city, contact,details,youtubelink,facebooklink, image } = req.body;
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

        const user = await TShirtModel.create({
            companyname,
            personname,
            address,
            city,
            contact,
            details,
            youtubelink,
            facebooklink,
            image: imageData,
        });

        return res.status(200).json(user);
    } catch (e) {
        console.error("Error saving to MongoDB:", e);
        res.status(500).json({ error: e.message || "A server error occurred with this request" });
    }
};


export const gettshirt=async(req,res)=>{
         TShirtModel.find()
         .then((tshirts)=>
            {
                res.json(tshirts);
            } )      
         .catch((err)=>res.json(err))

}