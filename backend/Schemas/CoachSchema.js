import { Schema } from "mongoose";

export const CoachSchema=new Schema({
    name:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required: true,
    },
    feesPM:{
        type:Number,
        required: true,
    },
    feesPD:{
        type:Number,
        required: true,
    },
    contact:
    {
        type:Number,
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


