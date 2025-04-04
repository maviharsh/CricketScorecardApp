import React from "react";
import { useState } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
  export default function AddNewTeam() {
    let [loading, setLoading] = useState(false);

           const navigate=useNavigate();
                 
                  const initial={
                    teamname:"",
                    city:"",
                    captainname:""
                  }
                
                  const NewTeamValidationSchema = Yup.object({
                    teamname: Yup.string().required("Please enter time"),
                    city:Yup.string().required("Please enter address"),
                    captainname: Yup.string().required("Please enter your city")
                   });
                
                  const {values,handleBlur,handleChange,handleSubmit,errors,resetForm}=useFormik({
                    initialValues:initial,
                    validationSchema:NewTeamValidationSchema,
                    onSubmit: async (e,{resetForm}) => {
                     setLoading(true)
                     resetForm();
                      setLoading(false)
                      navigate("/addplayers",
                        {
                          state:{
                            teamname:values.teamname,
                            city:values.city,
                            captainname:values.captainname
                          }
                        }
                      );
                    }
                  })
                  const isValid=values.teamname&&values.city&&values.captainname;

    return (
       
        <div className="flex justify-center m-5">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Your Team
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Team Name
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="teamname"
                onChange={handleChange}
                    value={values.teamname}
                    onBlur={handleBlur}
            />
             {
                    errors.teamname&&<small>{errors.teamname}</small>
                  } 
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              City
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="city"
              onChange={handleChange}
                  value={values.city}
                  onBlur={handleBlur}
            />
             {
                    errors.city&&<small>{errors.city}</small>
                  } 
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Captain Name
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="captainname"
              onChange={handleChange}
                  value={values.captainname}
                  onBlur={handleBlur}
            />
             {
                    errors.captainname&&<small>{errors.captainname}</small>
             } 

          </div>
                 <Button type="submit" size="lg" disabled={!isValid}>{loading ? "Submitting..." : "ADD PLAYERS"}</Button> 
          
        </form>
      </Card>
      </div>
    );
  }