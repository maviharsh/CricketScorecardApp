import React from "react";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function PlayerTeam({ photo, url }) {
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

  const navigate = useNavigate();

  const initial = {
    role: [],
    address: "",
    city: "",
    image: "",
    contact: "",
  };

  const CoachValidationSchema = Yup.object({
    role: Yup.array().min(1, "Please select at least one role"),
    address: Yup.string().required("Please enter address"),
    city: Yup.string().required("Please enter your city"),
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number")
      .required("Please enter your contact number"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik({
      initialValues: initial,
      validationSchema: CoachValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        // Fixed Argument
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/${url}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role: values.role,
              address: values.address,
              city: values.city,
              contact: values.contact,
              image: imageBase64,
            }),
          }
        );

        const json = await response.json();

        if (response.ok) {
          setData(json);
          console.log(json);
        }

        resetForm();
        setImage(null);
        setImageBase64("");
        fileInputRef.current.value = "";
        setLoading(false);
        navigate("/looking");
      },
    });

  const isValid =
    values.role.length > 0 &&
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
            name="photo"
            accept="image/*"
            onChange={handleImage}
          />
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="mt-4 flex flex-col gap-1"
          >
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                ROLE
              </Typography>

             <div className="flex gap-3">

             
              {["Batter", "Bowler", "Allround"].map((roleOption) => (
                <label key={roleOption}>
                  <input
                    type="checkbox"
                    name="role"
                    value={roleOption}
                    onChange={(e) => {
                      const value = e.target.value;
                      let newRoles = [...values.role];

                      if (newRoles.includes(value)) {
                        newRoles = newRoles.filter((item) => item !== value);
                      } else {
                        newRoles.push(value);
                      }

                      setFieldValue("role", newRoles); // ✅ Correct way to update checkbox state in Formik
                    }}
                    checked={values.role.includes(roleOption)}
                  />
                  {roleOption}
                </label>
              ))}
            </div>
            {errors.role && <small>{errors.role}</small>}
            </div>


            <div className="my-4 flex items-center gap-4">
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
                {errors.address && <small>{errors.address}</small>}
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
                {errors.city && <small>{errors.city}</small>}
              </div>
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
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
            {errors.contact && <small>{errors.contact}</small>}
            <Button
              className="mt-4"
              type="submit"
              size="lg"
              disabled={!isValid}
            >
              {loading ? "Submitting..." : "REGISTER"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
