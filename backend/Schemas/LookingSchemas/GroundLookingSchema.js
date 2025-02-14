import { Schema } from "mongoose";

export const GroundLookingSchema=new Schema({
    name:{
        type:String,
    },
    date:{
          type:Date,
          required:true,
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


