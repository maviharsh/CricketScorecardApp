import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [scorers,setScorers]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/scorerform`)
           .then((scorer)=>{
                     setScorers(scorer.data);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/scorerform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {scorers.map((scorer, index) => (
                             <Carding
                               key={index} 
                               name={scorer.name}
                               city={scorer.city}
                               feesPD={scorer.feesPD}
                               feesPM={scorer.feesPM}
                               contact={scorer.contact}
                               src={scorer.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}