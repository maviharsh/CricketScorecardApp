import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";



export default function CoachPage()
{

  
 let [coache,setCoache]=useState([]);

 useEffect(()=>{
   axios.get(`${process.env.REACT_APP_API_URL}/api/coachform`)
   .then((coaches)=>{
         setCoache(coaches.data);
   })
   .catch((err)=>{
     console.log(err);
   })
 },[])




    return(
        <>
        <div className="flex justify-end">
                        <Link to="/coachform">
                        <Button variant="gradient" className="m-5">REGISTER</Button>
                        </Link>
        </div>
        <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
        {coache.map((coach, index) => (
          <Carding
            key={index} 
            name={coach.name}
            city={coach.city}
            feesPD={coach.feesPD}
            feesPM={coach.feesPM}
            contact={coach.contact}
            src={coach.image.url}
          />
        ))}
          </div>
        </>
    )
}