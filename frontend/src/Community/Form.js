import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import {useFormik} from 'formik';
 
export default function Form() {

  const [coaches,setCoaches]=useState([]);
  const url="http://localhost:4000/api/coachform";
  useEffect(()=>{
    axios.get(url)
    .then((res)=>{
          setCoaches(res.data);
    })
    .catch((err)=>{
         console.log(err);
    })
  },[]);
 
   const formik=useFormik({
    initialValues:{
      name:'',
      contact:'',
      feesPM:'',
      feesPD:'',
      city:'',
      imagica:''
    },
    onSubmit:(values)=>{
      console.log(values);
      
      const formData=new FormData();
      for(let value in values)
      {
        formData.append(value,values[value]);
      }

      axios.post(url,formData)
      .then((res)=>{
             setCoaches(coaches.concat(res.data));
      })

     }  
   })

  
  return (

     <>
      <div>
        {coaches.map((coach) => (
          <div key={coach.id}>
            <img src={coach.photo} alt='profile-pic' />
            <h4>Name:{coach.name}</h4>
            <h4>City:{coach.city}</h4>
            <h4>Fees Per Match:{coach.feesPM}</h4>
            <h4>Fees Per Day:{coach.feesPD}</h4>
            <h4>Contact:{coach.contact}</h4>
          </div>
        ))}
      </div>

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
        className="w-64" 
        type="file" 
        name='photo' 
        accept='image/*' 
        onChange={(e)=>
          formik.setFieldValue('photo',e.currentTarget.files[0])
        } 
        />
        
      </CardHeader>
      <CardBody>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className="mt-4 flex flex-col gap-4">
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
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                        onChange={formik.handleChange}
                        value={formik.values.city}
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
                        onChange={formik.handleChange}
                        value={formik.values.feesPM}
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
                        onChange={formik.handleChange}
                        value={formik.values.feesPD}
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
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                  />
                </div>
                <Button type="submit" size="lg">REGISTER</Button>
              </form>
      </CardBody>
    </Card>
    </div>
    </>
    
  )};