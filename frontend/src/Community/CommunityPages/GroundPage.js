import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [grounds,setGrounds]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/groundform`)
           .then((ground)=>{
                     setGrounds(ground);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/groundform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {grounds.map((ground, index) => (
                             <Carding
                               key={index} 
                               name={ground.name}
                               city={ground.city}
                               feesPD={ground.feesPD}
                               feesPM={ground.feesPM}
                               contact={ground.contact}
                               src={ground.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}