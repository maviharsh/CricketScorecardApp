import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';

export default function RegisterForm() {
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
  };

  const navigate = useNavigate();

  const initial = {
    name: "",
    role: "",
    dob: "",
    email: "",
    password: "",
    image: "",
    contact: "",
  };

  const SignUpValidationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    role: Yup.string().required("Please enter your playing role"),
    dob: Yup.date().required("Please enter Date Of Birth"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .min(6, "The password should be atleast 6 characters")
      .required("Please enter the password"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number")
      .required("Please enter your contact number"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initial,
    validationSchema: SignUpValidationSchema,
    onSubmit: async (e, { resetForm }) => {
      setLoading(true);
    
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/userform`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            role: values.role,
            dob: values.dob,
            email: values.email,
            password: values.password,
            contact: values.contact,
            image: imageBase64,
          }),
        });
    
        const json = await response.json();
    
        if (!response.ok) {
          throw new Error(json.error || "Something went wrong. Please try again.");
        }
    
        setData(json);
        console.log(json);
    
        // Success actions
        resetForm();
        setImage(null);
        setImageBase64("");
        fileInputRef.current.value = "";
        navigate(""); // Adjust navigation as needed
      } catch (error) {
        console.error("Signup error:", error.message);
        toast(error.message);
      } finally {
        setLoading(false);
      }
    },});
  const isValid =
    values.name &&
    values.role &&
    values.dob &&
    values.contact &&
    values.email &&
    values.password && values.password.length>=6&&
    image;

  return (
    <div className="flex justify-center items-center mt-5">
      <Card color="transparent" shadow={false}>
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="flex flex-col justify-center items-center mb-4">
            <div className="mb-4 h-20 p-6 text-white">
              <img
                src="camera-add-svgrepo-com.svg"
                alt="imagica"
                className="h-16"
              ></img>
            </div>

            <input
              ref={fileInputRef}
              className="w-64"
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          <div className="flex justify-center pb-3 items-center"></div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
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
            {errors.name && <small>{errors.name}</small>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Playing Role
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Batsman/Bowler/Allrounder"
              name="role"
              type="text"
              onChange={handleChange}
              value={values.role}
              onBlur={handleBlur}
            />
            {errors.role && <small>{errors.role}</small>}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              D.O.B
            </Typography>
            <Input
              type="date"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="dob"
              onChange={handleChange}
              value={values.dob}
              onBlur={handleBlur}
            />
            {errors.dob && <small>{errors.dob}</small>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Contact
            </Typography>
            <Input
              size="lg"
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
            {errors.contact && <small>{errors.contact}</small>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="email"
              type="text"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
            />
            {errors.email && <small>{errors.email}</small>}
            <ToastContainer />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />

            {errors.password && <small>{errors.password}</small>}
          </div>

          <Button type="submit" className="mt-6" fullWidth disabled={!isValid}>
            {loading ? "Submitting..." : "SIGN UP"}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
