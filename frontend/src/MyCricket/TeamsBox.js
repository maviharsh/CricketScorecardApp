import React from "react";
import {Button } from "@material-tailwind/react";


export default function TeamBox()
{
    
    return(
        
        <div className="flex justify-center">
        <div className="flex w-full p-4 gap-1">
      <div className="flex justify-evenly items-center border border-gray-400 w-full h-16">
      <div className="flex items-center gap-1">
      <div className="border flex items-center justify-center border-gray-500 rounded-full bg-orange-900 h-10 w-10">DK</div>
      <div>Defaulter Kings</div>
      </div>
      <div>Ghaziabad</div>
      <div>Ricky</div>
      </div>
      <Button
        size="sm"
        color={"red"} 
        className="rounded"
      >
        <img src="qr-code-svgrepo-com.svg" className="w-6" alt="imagica"></img>
      </Button>
    </div>
    </div>
    )
}
