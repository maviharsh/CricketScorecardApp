import { Schema } from "mongoose";

export const UserSchema=new Schema({
      name:String,
      playerType:String,
      email:{
        type:String,
        unique:true
      },
      phone:{
       type:Number,
       unique:true
      },
      followers:
      {
       type:Number,
      },
      photo:
      {
        
      }
});
