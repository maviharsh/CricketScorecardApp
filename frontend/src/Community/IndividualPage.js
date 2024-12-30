import Carding from "./Card";

import { Link } from "react-router-dom";
import{Button} from '@material-tailwind/react';

export default function IndividualPage({path})
{
    return(
        <>
        <div className="flex justify-end">
                        <Link to="/form">
                        <Button variant="gradient" className="m-5">REGISTER</Button>
                        </Link>
        </div>
        <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
          <Carding />
          <Carding /> 
          <Carding /> 
          <Carding />
          <Carding /> 
          <Carding /> 
          <Carding />
          <Carding />
        </div>
        </>
    )
}