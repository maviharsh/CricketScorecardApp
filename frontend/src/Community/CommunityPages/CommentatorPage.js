import Carding from "../Elements/Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';
import axios from "axios"; 
import { useState,useEffect } from "react";

export default function CommentatorPage()
{
    let [commentators,setCommentators]=useState([]);
    useEffect(()=>{
          axios.get(`${process.env.REACT_APP_API_URL}/api/commentatorform`)
          .then((commentator)=>{
              setCommentators(commentator.data);
          })
          .catch((err)=>console.log(err))
    },[])

    return(
        <>
                <div className="flex justify-end">
                                <Link to="/commentatorform">
                                <Button variant="gradient" className="m-5">REGISTER</Button>
                                </Link>
                </div>
                <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
                {commentators.map((commentator, index) => (
                  <Carding
                    key={index} 
                    name={commentator.name}
                    city={commentator.city}
                    feesPD={commentator.feesPD}
                    feesPM={commentator.feesPM}
                    contact={commentator.contact}
                    src={commentator.image.url}
                  />
                ))}
                  </div>
                </>
    )
}