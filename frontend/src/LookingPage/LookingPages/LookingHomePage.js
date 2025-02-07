import { Link } from "react-router-dom";
import LookingCard from "../Elements/LookingCard";
import{
   Button
}
from "@material-tailwind/react"
export default function LookingHomePage()
{
   return(
      <>
          <div className="flex justify-end">
            <Link to="/postpage">
            <Button variant="gradient" className="m-5">POST</Button>
            </Link>
          </div>
    <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-20">
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />
         <LookingCard />

    </div>
    </>
   )

}