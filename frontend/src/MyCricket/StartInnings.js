import { Button } from "@material-tailwind/react";
import Buttons from "../LookingPage/Elements/Buttons";
import { Link } from "react-router-dom";

export default function StartInnings({team1,team2}){
    return(
        <>
        <div className="flex justify-center mt-5 text-2xl">BATTING-{team1}</div>
         <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-32">
               
               <Buttons source={"cricket-player-svgrepo-com.svg"} tex={"Select Striker"}/>
               <Buttons source={"cricket-player-svgrepo-com.svg"} tex={"Select Non-Striker"}/>
         </div>
         <div className="flex justify-center mt-5 text-2xl">BOWLING-{team2}</div>
         <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-32">
                 <Buttons source={"ball.svg"} tex={"Select Bowler"}/>
         </div>
         <div className="flex justify-center m-5">
            <Link to="/scoringpage">
         <Button className="text-xl">Start Scoring</Button>
           </Link>
         </div>
        </>
    )
}
