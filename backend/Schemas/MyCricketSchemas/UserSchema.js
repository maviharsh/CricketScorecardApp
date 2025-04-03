import { Schema } from "mongoose";

export const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
          type:String,
          required:true,
    },
    dob:{
        type:Date,
        required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
     },
    contact:
    {
        type:Number,
        required: true,
        unique:true,
    },
    password:{
          type:String,
          required:true,
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


