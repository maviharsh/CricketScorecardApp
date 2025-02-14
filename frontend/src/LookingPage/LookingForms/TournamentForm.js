import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState,useRef } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";


 
export default function TournamentForm({photo}) {
 
   
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
                tournamentname:"",
                matcheson:[],
                address:"",
                city:"",
                date:"",
                fees:"",
                totalteams:"",
                image:"",
                contact:""
              }
            
              const CoachValidationSchema = Yup.object({
                tournamentname: Yup.string().required("Please enter tournament name"),
                matcheson: Yup.array().min(1, "Please select at least one option"),
                address:Yup.string().required("Please enter address"),
                city: Yup.string().required("Please enter your city"),
                date:Yup.date().required("Please enter date"),
                fees:Yup.number().required("please enter fees"),
                totalteams:Yup.number().required("Please enter the number of teams"),
                contact: Yup.string().matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number").required("Please enter your contact number"),
               });
            
              const {values,handleBlur,handleChange,handleSubmit,errors,setFieldValue}=useFormik({
                initialValues:initial,
                validationSchema:CoachValidationSchema,
                onSubmit: async (e,{resetForm}) => {
                 setLoading(true)
                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/teamsfortournamentform`, {
                     method: "POST",
                     headers: {
                         "Content-Type": "application/json"
                     },
                     body: JSON.stringify(
                      {tournamentname:values.tournamentname,
                        matcheson:values.matcheson,  
                        address:values.address,
                        city:values.city,
                        date:values.date,
                        fees:values.fees,
                        totalteams:values.totalteams,
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
                  navigate("/looking");
                  
               }
              })
              const isValid =
              values.date&&
              values.fees&&
              values.totalteams&&
              values.tournamentname&&
              values.matcheson.length > 0 &&
              values.contact &&
              values.address &&
              values.city &&
              image;            
        

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
                    TOURNAMENT NAME
                  </Typography>
                  <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="tournamentname"
                        type="text"
                    onChange={handleChange}
                    value={values.tournamentname}
                    onBlur={handleBlur}
                  />
                    {
                    errors.tournamentname&&<small>{errors.tournamentname}</small>
                  }
                  </div>
                  <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="mb-2 font-medium"
                                >
                                  MATCHES ON
                                </Typography>
                  
                                <div className="flex gap-3">

                   
                                {["Weekdays", "Weekend"].map((roleOption) => (
                                  <label key={roleOption}>
                                    <input
                                      type="checkbox"
                                      name="matcheson"
                                      value={roleOption}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        let newRoles = [...values.matcheson];
                  
                                        if (newRoles.includes(value)) {
                                          newRoles = newRoles.filter((item) => item !== value);
                                        } else {
                                          newRoles.push(value);
                                        }
                  
                                        setFieldValue("matcheson", newRoles); // ✅ Correct way to update checkbox state in Formik
                                      }}
                                      checked={values.matcheson.includes(roleOption)}
                                    />
                                    {roleOption}
                                  </label>
                                ))}
                  
                              </div>
                              {errors.matcheson && <small>{errors.matcheson}</small>}

                            </div>
                  <div >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium my-2"
                  >
                    START DATE
                  </Typography>
                  <Input
                  type="date"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                    onBlur={handleBlur}
                  />
                  {
                    errors.date&&<small>{errors.date}</small>
                  }
                  </div>
 
                <div className="my-3">
 
                 <div className="flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        ADDRESS
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
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
                    <div>
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
                    </div>
                  </div>
                  <div className="my-4 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        FEES
                      </Typography>
                      <Input
                        type="number"
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="fees"
                    onChange={handleChange}
                    value={values.fees}
                    onBlur={handleBlur}
                      />
                        {
                    errors.fees&&<small>{errors.fees}</small>
                  }
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        TOTAL TEAMS
                      </Typography>
                      <Input
                         type="number"
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="totalteams"
                    onChange={handleChange}
                    value={values.totalteams}
                    onBlur={handleBlur}
                      />
                        {
                    errors.totalteams&&<small>{errors.totalteams}</small>
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
                    type="number"
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
                 <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "REGISTER"}</Button> 
              </form>
      </CardBody>
    </Card>
    </div>
  )};