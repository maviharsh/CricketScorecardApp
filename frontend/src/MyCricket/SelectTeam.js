import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function SelectTeam() {
  let [loading, setLoading] = useState(false);

  const initial = {
    teamname: "",
  };

  const TeamValidationSchema = Yup.object({
    teamname: Yup.string().required("Please enter Team name"),
  });

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initial,
    validationSchema: TeamValidationSchema,
    onSubmit: async (_values, { resetForm }) => {
      setLoading(true);

      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/findteam`,
          { teamname: values.teamname }, 
          { withCredentials: true } 
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          toast.error("Could Not Find Team");
        });

      resetForm();
      setLoading(false);
    },
  });

  const isValid = values.teamname;

  return (
    <div className="flex justify-around m-3">
      <form onSubmit={handleSubmit}>
        <input
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          name="teamname"
          type="text"
          onChange={handleChange}
          value={values.teamname}
          onBlur={handleBlur}
          placeholder="Enter Team Name"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white"
          disabled={!isValid}
        >
          {loading ? "FINDING..." : "FIND TEAM"}
        </button>
      </form>

      <Link to="/makenewteam">
        <button className="bg-blue-900 text-white">Add New Team</button>
      </Link>
      <ToastContainer />
    </div>
  );
}
