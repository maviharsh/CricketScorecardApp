import { Schema } from "mongoose";

export const GroundSchema=new Schema({
    groundname:{
        type:String,
        required: true,
    },
    personname:{
            type:String,
            required:true,
    },
    address:{
        type:String,
        required:true,
    }
    ,
    city:{
        type:String,
        required: true,
    },
    gmail:{
         type:String,
         required:true,  
    },
    minfees:{
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
              return v >= 0;
            },
            message: props => `${props.value} is not a valid number! It must be >= 0.` 
        }
    },
    maxfees:{
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
              return v >= 0;
            },
            message: props => `${props.value} is not a valid number! It must be >= 0.` 
        }
    },
    minboundary:{
        type:Number,
        required: true,
        validate: {
            validator: function (v) {
              return v >= 0;
            },
            message: props => `${props.value} is not a valid number! It must be >= 0.` 
        }
    },
    maxboundary:{
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


