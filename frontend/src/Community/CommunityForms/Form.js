import React from "react";
import { useState,useRef } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

 
export default function Form({photo}) {

  
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

 const navigate=useNavigate();
 
  const initial={
    name:"",
    city:"",
    feesPD:"",
    feesPM:"",
     image:"",
     contact:""
  }

  const CoachValidationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    city: Yup.string().required("Please enter your city"),
    feesPD: Yup.number().required("Please enter daily fees").min(0, "Fees must be at least 0"),
    feesPM: Yup.number().required("Please enter monthly fees").min(0, "Fees must be at least 0"),
    contact: Yup.string().matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number").required("Please enter your contact number"),
   });

  const {values,handleBlur,handleChange,handleSubmit,errors,resetForm}=useFormik({
    initialValues:initial,
    validationSchema:CoachValidationSchema,
    onSubmit: async (e,{resetForm}) => {
     setLoading(true)
     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coachform`, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(
          {name:values.name, 
            city:values.city,
            feesPD:values.feesPD,
            feesPM:values.feesPM,
            contact:values.contact, 
            image: imageBase64
          })
     })
   
     const json = await response.json()
   
     if(response.ok){
         setData(json)
         console.log(json)
     }
      
     resetForm();
     setImage(null);
      setImageBase64("");
      fileInputRef.current.value = '';
      setLoading(false)
      navigate("/individualpage");
      
   }
  })
  const isValid=values.name&&values.contact&&values.city&&values.feesPD&&values.feesPM&&image;


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
          <img src={photo} alt="imagica" className="h-16"></img>
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
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                  />
                  {
                    errors.name&&<small>{errors.name}</small>
                  }
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
                        onChange={handleChange}
                    value={values.city}
                    onBlur={handleBlur}
                      />
                      {
                    errors.city&&<small>{errors.city}</small>
                  }
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
                        onChange={handleChange}
                        value={values.feesPM}
                        onBlur={handleBlur}
                      />
                      {
                    errors.feesPM&&<small>{errors.feesPM}</small>
                  }
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
                        onChange={handleChange}
                        value={values.feesPD}
                        onBlur={handleBlur}
                      />
                      {
                    errors.feesPD&&<small>{errors.feesPD}</small>
                  }
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
                    onChange={handleChange}
                    value={values.contact}
                    onBlur={handleBlur}
                  />
                  {
                    errors.contact&&<small>{errors.contact}</small>
                  }
                </div>
                 <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "REGISTER"}</Button> 
              </form>
      </CardBody>
    </Card>
    </div>
  
    
  )};

  //NUMBER AND FEES VALIDATION