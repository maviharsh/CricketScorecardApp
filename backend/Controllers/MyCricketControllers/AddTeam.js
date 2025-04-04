//RESUME HERE

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
       
        
        return res.status(200).json("nothing");
    } catch (err) {
        console.log('GOT ERROR:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
