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

export default function GroundForm() {

  
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
      groundname:"",
      personname:"",
      address:"",
      city:"",
      gmail:"",
      minfees:"",
      maxfees:"",
      minboundary:"",
      maxboundary:"",
      image:"",
      contact:""
    }
  
    const FormValidationSchema = Yup.object({
      groundname: Yup.string().required("Please enter groundname"),
      personname: Yup.string().required("Please enter your name"),
      address: Yup.string().required("Please enter address"),
      city: Yup.string().required("Please enter your city"),
      gmail: Yup.string().required("Please enter gmail"),
      minfees: Yup.number().required("Please enter minimum fees").min(0, "Fees must be at least 0"),
      maxfees: Yup.number().required("Please enter maximum fees").min(0, "Fees must be at least 0"),
      minboundary: Yup.number().required("Please enter minimum boundary length").min(0, "Boundary length must be at least 0"),
      maxboundary: Yup.number().required("Please enter maximum boundary length").min(0, "Boundary length must be at least 0"),
      contact: Yup.string().matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number").required("Please enter your contact number"),
     });
  
    const {values,handleBlur,handleChange,handleSubmit,errors,resetForm}=useFormik({
      initialValues:initial,
      validationSchema:FormValidationSchema,
      onSubmit: async (e,{resetForm}) => {
       setLoading(true)
       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groundform`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(
            {groundname:values.groundname, 
            personname:values.personname, 
            address:values.address,
              city:values.city,
              gmail:values.gmail,
              minfees:values.minfees,
              maxfees:values.maxfees,
              minboundary:values.minboundary,
              maxboundary:values.maxboundary,
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
        navigate("/groundpage");
        
     }
    })
    const isValid=values.groundname&&values.personname&&values.contact&&values.city&&values.address&&values.gmail&&values.minfees&&values.maxfees&&values.minboundary&&values.maxboundary&&image;
  


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
            <img
              src="cricket-ground-cricket-svgrepo-com.svg"
              alt="imagica"
              className="h-16"
            ></img>
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
                GROUND NAME
              </Typography>
              <Input
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="groundname"
                    type="text"
                    onChange={handleChange}
                    value={values.groundname}
                    onBlur={handleBlur}
              />
               {
                    errors.groundname&&<small>{errors.groundname}</small>
               }
            </div>

            <div className="my-3">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                CONTACT PERSON NAME
              </Typography>
              <Input
                containerProps={{ className: "min-w-[72px]" }}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                name="personname"
                    type="text"
                    onChange={handleChange}
                    value={values.personname}
                    onBlur={handleBlur}
              />
              {
                    errors.personname&&<small>{errors.personname}</small>
               }
              <div className="mt-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="my-2 font-medium"
                >
                  ADDRESS
                </Typography>
                <Input
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="address"
                    type="text"
                    onChange={handleChange}
                    value={values.address}
                    onBlur={handleBlur}
                />
                 {
                    errors.address&&<small>{errors.address}</small>
               }
             
              </div>
              <div className="mt-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  CITY
                </Typography>
                <Input
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
             
              </div>
              <div className="mt-5">
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
                    onChange={handleChange}
                    value={values.contact}
                    onBlur={handleBlur}
                />
                 {
                    errors.contact&&<small>{errors.contact}</small>
               }
             
              </div>
              <div className="mt-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  GMAIL
                </Typography>
                <Input
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="gmail"
                    type="text"
                    onChange={handleChange}
                    value={values.gmail}
                    onBlur={handleBlur}
                />
                 {
                    errors.gmail&&<small>{errors.gmail}</small>
               }
             
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    BOUNDARY LENGTH
                  </Typography>
                  <Input
                    placeholder="Minimum Length"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="minboundary"
                    onChange={handleChange}
                    value={values.minboundary}
                    onBlur={handleBlur}
                  />
                   {
                    errors.minboundary&&<small>{errors.minboundary}</small>
               }
             
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  ></Typography>
                  <Input
                    placeholder="Maximum Length"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 m-3"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="maxboundary"
                    onChange={handleChange}
                    value={values.maxboundary}
                    onBlur={handleBlur}
                  />
                   {
                    errors.maxboundary&&<small>{errors.maxboundary}</small>
               }
             
                </div>
              </div>
              
              <div className="mt-5 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    MATCH FEES
                  </Typography>
                  <Input
                    placeholder="Minimum Fees"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="minfees"
                    onChange={handleChange}
                    value={values.minfees}
                    onBlur={handleBlur}
                  />
                   {
                    errors.minfees&&<small>{errors.minfees}</small>
               }
             
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  ></Typography>
                  <Input
                    placeholder="Maximum Fees"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 m-3"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="maxfees"
                    onChange={handleChange}
                    value={values.maxfees}
                    onBlur={handleBlur}
                  />
                   {
                    errors.maxfees&&<small>{errors.maxfees}</small>
                   }
             
                </div>
              </div>

            </div>
                 <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "REGISTER"}</Button> 
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
