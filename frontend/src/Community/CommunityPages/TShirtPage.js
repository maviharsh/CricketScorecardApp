import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [tshirts,setshirts]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/tshirtform`)
           .then((tshirt)=>{
                     setshirts(tshirt);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/tshirtform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {tshirts.map((tshirt, index) => (
                             <Carding
                               key={index} 
                               name={tshirt.name}
                               city={tshirt.city}
                               feesPD={tshirt.feesPD}
                               feesPM={tshirt.feesPM}
                               contact={tshirt.contact}
                               src={tshirt.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}