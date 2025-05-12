//RESUME

import { Team } from "../../Model/MyCricketModels/TeamModel.js"; 

export const addteam = async (req, res) => {
    console.log("api request recieved");
    try {
       
        console.log(req.body.teamname);
        console.log(req.body.captainname);
        console.log(req.body.city);
        console.log(req.body.players); 
        
        if (!Team) {
            console.error("Team model is not imported correctly.");
            return res.status(500).json({ error: "Internal Server Error: Model Not Found" });
        }
       
        let alreadyExists=await Team.findOne({teamname:req.body.teamname});
        if(alreadyExists)
        {
            return res.status(400).json("Team Already Exists");
        }

        const team=Team.create({
            teamname:req.body.teamname,
            captainname:req.body.captainname,
            city:req.body.city,
            players:req.body.players,
        });

        return res.status(200).json(team);

    } catch (err) {
        console.log('GOT ERROR:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
