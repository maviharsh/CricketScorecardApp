import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

 
export default function Form({photo,secondlast,last}) {
 
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
        <Typography variant="h5" color="white">
          UPLOAD PHOTO
        </Typography>
      </CardHeader>
      <CardBody>
                <form className="mt-4 flex flex-col gap-4">
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
                  />
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
                      />
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
                  />
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
                  />
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
                  />
                  </div>
                  <div className="mt-5">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    DETAILS
                  </Typography>
                  <textarea placeholder="Add More Details About Your Service" className="border-black w-11/12"/>
                  </div>
                  <div className="my-3 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        {secondlast}
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        {last}
                      </Typography>
                      <Input
                        containerProps={{ className: "min-w-[72px]" }}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button size="lg">REGISTER</Button>
              </form>
      </CardBody>
    </Card>
    </div>
  )};