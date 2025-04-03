import mongoose, { Schema } from "mongoose";

export const TeamSchema=new Schema({
     teamname:{
            type:'String',
            required:true
     },
     city:{
           type:'String',
           required:true
     },
     captainname:{
            type:'String',
            required:true
     },
     players:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"UserSchema"}]
     }
});


