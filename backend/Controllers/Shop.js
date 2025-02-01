import {ShopModel} from '../Model/ShopModel.js';
import { uploadToCloudinary } from '../Services/cloudinary.js';

export const shop = async (req, res) => {
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

        const user = await ShopModel.create({
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


export const getshop=async(req,res)=>{
         ShopModel.find()
         .then((shops)=>
            {
                res.json(shops);
            } )      
         .catch((err)=>res.json(err))

}