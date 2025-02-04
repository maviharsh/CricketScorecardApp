import Carding from "../Elements/CoachCard";

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
                     setShops(shop.data);
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
                                         companyname={shop.companyname}
                                         personname={shop.personname}
                                         address={shop.address}
                                         city={shop.city}
                                         contact={shop.contact}
                                         details={shop.details}
                                         youtubelink={shop.youtubelink}
                                         facebooklink={shop.facebooklink}
                                         src={shop.image.url}
                                       />
                           ))}
                             </div>
           </>
    )
}