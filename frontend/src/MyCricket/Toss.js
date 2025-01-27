import { Button } from "@material-tailwind/react";
import Buttons from "../LookingPage/Buttons";
import { Link } from "react-router-dom";

export default function Toss(){
    return(
        <>
        <div className="flex justify-center mt-5 text-2xl">WHO WON THE TOSS?</div>
         <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-32">
               
               <Buttons source={"scorecard-svgrepo-com.svg"} tex={"Scorers"}/>
               <Buttons source={"manager-boss-svgrepo-com.svg"} tex={"Coaches"}/>
         </div>
         <div className="flex justify-center mt-5 text-2xl">WINNER OF THE TOSS ELECTED TO?</div>
         <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-32">
                 <Buttons source={"cricket-bat-svgrepo-com.svg"} tex={"BAT"}/>
               <Buttons source={"ball.svg"} tex={"BOWL"}/>
         </div>
         <div className="flex justify-center m-5">
            <Link to="/startinnings" >
         <Button className="text-xl">Let's Play</Button>
            </Link>
         </div>
        </>
    )
}