import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function GroundPage()
{
    let [shops,setShops]=useState([]);

    useEffect(()=>{
           axios.get(`${process.env.REACT_APP_API_URL}/api/shopform`)
           .then((shop)=>{
                     setShops(shop);
           })
           .catch((err)=>console.log(err));
    },[])

    return(
           <>
            <div className="flex justify-end">
                                           <Link to="/shopform">
                                           <Button variant="gradient" className="m-5">REGISTER</Button>
                                           </Link>
                           </div>
                           <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                           {shops.map((shop, index) => (
                             <Carding
                               key={index} 
                               name={shop.name}
                               city={shop.city}
                               feesPD={shop.feesPD}
                               feesPM={shop.feesPM}
                               contact={shop.contact}
                               src={shop.image.url}
                             />
                           ))}
                             </div>
           </>
    )
}