import { Schema } from "mongoose";

export const PlayerForTeamSchema=new Schema({
    name:{
        type:String,
    },
    role:{
          type:Array,
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




