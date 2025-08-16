import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function SelectTeam() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selecting, team1, team2 } = location.state || {};

  const [loading, setLoading] = useState(false);

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
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/teams/find`,
          { teamname: _values.teamname },
          { withCredentials: true }
        );
        
        const foundTeam = response.data;


       navigate("/startmatch", {
            state: {
                team: { name: foundTeam.teamname, id: foundTeam._id }, // Pass ID and Name
                selecting,
                team1: selecting === "team1" ? { name: foundTeam.teamname, id: foundTeam._id } : team1,
                team2: selecting === "team2" ? { name: foundTeam.teamname, id: foundTeam._id } : team2,
            },
        });
      } catch (err) {
        toast.error("Could Not Find Team");
      } finally {
        resetForm();
        setLoading(false);
      }
    },
  });

  const isValid = values.teamname.trim() !== "";

  return (
    <div className="flex flex-col items-center m-3 gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <input
          className="border p-2 rounded-md"
          name="teamname"
          type="text"
          onChange={handleChange}
          value={values.teamname}
          onBlur={handleBlur}
          placeholder="Enter Team Name"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded"
          disabled={!isValid}
        >
          {loading ? "FINDING..." : "FIND TEAM"}
        </button>
      </form>

      <Link to="/makenewteam">
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Add New Team
        </button>
      </Link>

      <ToastContainer />
    </div>
  );
}
