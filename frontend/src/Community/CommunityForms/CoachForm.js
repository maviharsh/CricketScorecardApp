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

 
export default function Form({photo,url,destination}) {

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
      companyname:"",
      personname:"",
      address:"",
      city:"",
      youtubelink:"",
      facebooklink:"",
      details:"",
      image:"",
      contact:""
    }
  
    const CoachValidationSchema = Yup.object({
      companyname: Yup.string().required("Please enter company name"),
      personname: Yup.string().required("Please enter person name"),
      address:Yup.string().required("Please enter address"),
      city: Yup.string().required("Please enter your city"),
      youtubelink:Yup.string(),
      facebooklink:Yup.string(),
      details:Yup.string().required("Please enter the details of your service"),
      contact: Yup.string().matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number").required("Please enter your contact number"),
     });
  
    const {values,handleBlur,handleChange,handleSubmit,errors,resetForm}=useFormik({
      initialValues:initial,
      validationSchema:CoachValidationSchema,
      onSubmit: async (e,{resetForm}) => {
       setLoading(true)
       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${url}`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(
            {companyname:values.companyname,
              personname:values.personname,  
              address:values.address,
              city:values.city,
              youtubelink:values.youtubelink,
              facebooklink:values.facebooklink,
              details:values.details,
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
        navigate(`${destination}`);
        
     }
    })
    const isValid=values.companyname&&values.personname&&values.contact&&values.address&&values.city&&values.details&&image;
  

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
                    COMPANY NAME
                  </Typography>
                  <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="companyname"
                    type="text"
                    onChange={handleChange}
                    value={values.companyname}
                    onBlur={handleBlur}
                  />
                  {
                    errors.companyname&&<small>{errors.companyname}</small>
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
                        type="text"
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
                    DETAILS
                  </Typography>
                  <textarea placeholder="Add More Details About Your Service" className="border-black w-11/12"
                  name="details"
                  type="text"
                  onChange={handleChange}
                  value={values.details}
                  onBlur={handleBlur}
                  />
                  {
                    errors.details&&<small>{errors.details}</small>
                  }
                  </div>
                  <div className="my-3 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        YouTube Link
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="youtubelink"
                        type="text"
                        onChange={handleChange}
                        value={values.youtubelink}
                        onBlur={handleBlur}
                      />
                      {
                    errors.youtubelink&&<small>{errors.youtubelink}</small>
                  }
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Facebook Link
                        </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="facebooklink"
                        type="text"
                        onChange={handleChange}
                        value={values.facebooklink}
                        onBlur={handleBlur}
                      />
                      {
                    errors.facebooklink&&<small>{errors.facebooklink}</small>
                  }
                    </div>
                  </div>
                </div>
                 <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "REGISTER"}</Button> 
              </form>
      </CardBody>
    </Card>
    </div>
  )};