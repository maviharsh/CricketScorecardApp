import { Schema } from "mongoose";

export const CoachSchema=new Schema({
    name:{
        type:String
    },
    city:{
        type:String
    },
    feesPM:{
        type:Number
    },
    feesPD:{
        type:Number
    },
    contact:
    {
        type:Number
    },
    photo:
    {
        type:String
    }
});


