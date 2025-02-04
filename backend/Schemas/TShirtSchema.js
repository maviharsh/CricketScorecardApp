import { Schema } from "mongoose";

export const TShirtSchema=new Schema({
    companyname:{
        type:String,
        required: true,
    },
    personname:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    contact:
    {
        type:Number,
        required: true,
    
    },
    details:{
        type:String,
        required: true,
    },
    youtubelink:{
        type:String,
        required: true,
    },
    facebooklink:{
        type:String,
        required: true,
    },
    image:
    {
            publicId:{
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
    }
},
    {timestamps: true}
);


