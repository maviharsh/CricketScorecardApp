import React from "react";

import { Input } from "@material-tailwind/react";

import { useState } from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify';


export default function PlayerSearchForm({ onSearch }) {
    let [loading, setLoading] = useState(false);
 
const initial={
   number:""  
  }

 const TeamValidationSchema = Yup.object({
   number: Yup.number().required("Please enter Player's number"),
  });

 const {values,handleBlur,handleChange,handleSubmit}=useFormik({
   initialValues:initial,
   validationSchema:TeamValidationSchema,
   onSubmit: async (e,{resetForm}) => {
    setLoading(true)
     await axios.post(`${process.env.REACT_APP_API_URL}/api/findplayers`,
        { number: values.number }, 
        { withCredentials: true } 
      )
     .then((response)=>{
        console.log(response.data.name);
        onSearch(response.data.name);
    })
     .catch((err)=>{
      toast.error("Could Not Find Player");
     })
    resetForm();
    setLoading(false);

     
  }
 })
 const isValid=values.number;


  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex ">
        <Input
          size="lg"
          placeholder="Search Players By Number"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          name="number"
          type="number"
          onChange={handleChange}
          value={values.number}
            onBlur={handleBlur}
        />
        <button
            type="submit"
            className=" top-0 end-0 p-2.5 text-sm font-medium  text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={!isValid}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <ToastContainer />
      </div>
    </form>
  );
}
