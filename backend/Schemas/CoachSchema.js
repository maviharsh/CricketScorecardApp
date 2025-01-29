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
        validate: {
            validator: function (v) {
              return v >= 0;
            },
            message: props => `${props.value} is not a valid number! It must be >= 0.` 
        }
    },
    feesPD:{
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
              return v >= 0;
            },
            message: props => `${props.value} is not a valid number! It must be >= 0.` 
        }
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


