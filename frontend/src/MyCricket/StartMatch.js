import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function StartMatch()
{
    return(
        <div className="flex items-center justify-center">
        <div className="flex flex-col gap-2 p-2">
            <Link to="/selectteam">
             <Button className="rounded-full h-32 w-32 text-6xl">+</Button>
             </Link>
             <div>
               SELECT TEAM A    
            </div>
            <div className="flex justify-center">
            <img src="vs-button-svgrepo-com.svg" alt="imagica" className="h-10 "></img>
            </div>
            <Link to="/selectteam">
            <Button className="rounded-full h-32 w-32 text-6xl">+</Button>
            </Link>
             <div>
               SELECT TEAM B  
            </div>
            <div className="flex justify-center">   
            <Link to="/matchdetails">
             <Button>NEXT</Button>
             </Link>  
             </div>      
        </div>
        </div>
    )
}