import React from "react";
import CheckboxHorizontalListGroup from "../Community/Checkbox";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

 
export default function MatchDetailsForm({head,photo}) {
 
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
          {head}
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
                    NO. OF OVERS
                  </Typography>
                  <Input
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mt-4 font-medium"
                  >
                    OVERS PER BOWLER
                  </Typography>
                  <Input
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
                    className="font-medium"
                  >
                    START DATE
                  </Typography>
                  <Input
                  type="date"
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
                    className="font-medium"
                  >
                    MATCH TIMINGS
                  </Typography>
                  <Input
                  type="time"
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
                    BALL TYPE
                  </Typography>
                  <CheckboxHorizontalListGroup first={"Leather"} second={"Tennis"} third={"Other"} />
                  <div className="my-4 flex items-center gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Ground
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
                        CITY
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
                
                <div >
                <Link to="/tosspage">
                <Button size="lg" className="w-full">NEXT</Button>
                </Link>
                </div>
              </form>
      </CardBody>
    </Card>
    </div>
  )};