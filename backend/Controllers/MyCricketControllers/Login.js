import { User } from "../../Model/MyCricketModels/UserModel.js";
import bcrypt from "bcrypt";

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
          const user=await User.findOne({email:email});
          if(!user)
          {
            res.status(404).json({error:"User not found"});
          }

          const ismatch=await bcrypt.compare(password,user.password);

          if(!ismatch)
          {
               console.log("wrong password");
               res.status(401).json({error:"The password is incorrect"});
          }
          else
          {
            console.log("correct password");
            res.status(200).json("login successful");
          }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Server error"});
    }
}