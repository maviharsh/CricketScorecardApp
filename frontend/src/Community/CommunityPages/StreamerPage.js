import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [streamers,setStreamers]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/streamerform`)
           .then((streamer)=>{
                     setStreamers(streamer);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/streamerform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {streamers.map((streamer, index) => (
                             <Carding
                               key={index} 
                               name={streamer.name}
                               city={streamer.city}
                               feesPD={streamer.feesPD}
                               feesPM={streamer.feesPM}
                               contact={streamer.contact}
                               src={streamer.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}