import React from "react";
import CheckboxHorizontalListGroup from "./Checkbox";

import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";

export default function GroundForm() {
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
            <img
              src="cricket-ground-cricket-svgrepo-com.svg"
              alt="imagica"
              className="h-16"
            ></img>
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
                GROUND NAME
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
                  GMAIL
                </Typography>
                <Input
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    BOUNDARY LENGTH
                  </Typography>
                  <Input
                    placeholder="Minimum Length"
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
                  ></Typography>
                  <Input
                    placeholder="Maximum Length"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 m-3"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
              <div className="mt-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  PITCH TYPE
                </Typography>
                
                <CheckboxHorizontalListGroup first={"Turf"} second={"Matting"} third={"Cement"} />
              </div>

              <div className="mt-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  FACILITIES
                </Typography>
                
                <CheckboxHorizontalListGroup first={"Umpires"} second={"Scorers"} third={"Water"} />
                <CheckboxHorizontalListGroup first={"Nets"} second={"Lights"} third={"Balls"}/>
                <CheckboxHorizontalListGroup first={"Toilet"} second={"Dugout"} third={"Cafe"}/>
              </div>
              
              <div className="mt-5 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    MATCH FEES
                  </Typography>
                  <Input
                    placeholder="Minimum Fees"
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
                  ></Typography>
                  <Input
                    placeholder="Maximum Fees"
                    containerProps={{ className: "min-w-[72px]" }}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900 m-3"
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
  );
}
