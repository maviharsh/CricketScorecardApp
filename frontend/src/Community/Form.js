import React from "react";
import { useState,useRef } from "react";


import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

 
export default function Form() {

   let [name,setName]=useState("");
   let [city,setCity]=useState("");
   let [feesPD,setFeesPD]=useState("");
   let [feesPM,setFeesPM]=useState("");
   let [contact,setContact]=useState("");
   let [image, setImage] = useState(null);
   let [imageBase64, setImageBase64] = useState("");
   let [loading, setLoading] = useState(false);
   let [data, setData] = useState(null);

   const fileInputRef = useRef();



   // convert image file to base64
   const setFileToBase64 = (file) => {
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onloadend = () => {
     setImageBase64(reader.result);
   };
 };

 // receive file from form
   const handleImage = (e) => {
   const file = e.target.files[0];
   setImage(file);
   setFileToBase64(file);
 };

 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coachform`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({name, city,feesPD,feesPM,contact, image: imageBase64})
  })

  const json = await response.json()

  if(response.ok){
      setLoading(false)
      setData(json)
      console.log(json)
  }
  setName("");
  setCity("");
  setFeesPD("");
  setFeesPM("");
  setContact("");
  setImage(null);
   setImageBase64("");
   fileInputRef.current.value = '';
}

 const isValid=name&&contact&&city&&feesPD&&feesPM&&image;

  return (

     
      
    <div className="p-5 flex justify-center">
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          <img src="referee-svgrepo-com.svg" alt="imagica" className="h-16"></img>
        </div>
        <input 
        ref={fileInputRef}
        className="w-64" 
        type="file" 
        name='photo' 
        accept='image/*' 
        onChange={handleImage} 
        />
        
      </CardHeader>
      <CardBody>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    NAME
                  </Typography>
                  <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="name"
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                  />
                </div>
 
                <div className="my-3">
 
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    CITY
                  </Typography>
                  <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="city"
                        type="text"
                        onChange={(e)=>setCity(e.target.value)}
                        value={city}
                      />
                  <div className="my-4 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        FEES PER MATCH
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="feesPM"
                        type="number"
                        onChange={(e)=>setFeesPM(e.target.value)}
                        value={feesPM}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        FEES PER DAY
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="feesPD"
                        type="number"
                        onChange={(e)=>setFeesPD(e.target.value)}
                        value={feesPD}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    CONTACT NUMBER
                  </Typography>
                  <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="contact"
                    type="tel"
                    onChange={(e)=>setContact(e.target.value)}
                    value={contact}
                  />
                </div>
                <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "REGISTER"}</Button>
              </form>
      </CardBody>
    </Card>
    </div>
  
    
  )};