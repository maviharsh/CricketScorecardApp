import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [umpires,setUmpires]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/umpireform`)
           .then((umpire)=>{
                     setUmpires(umpire.data);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/umpireform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {umpires.map((umpire, index) => (
                             <Carding
                               key={index} 
                               name={umpire.name}
                               city={umpire.city}
                               feesPD={umpire.feesPD}
                               feesPM={umpire.feesPM}
                               contact={umpire.contact}
                               src={umpire.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}