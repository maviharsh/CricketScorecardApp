import React from "react";
import CheckboxHorizontalListGroup from "../../Community/Elements/Checkbox";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function TournamentParticipateForm({ photo }) {
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
         
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-3">
            <Typography
              variant="small"
              color="blue-gray"
              className="mt-2 font-medium"
            >
              MATCHES ON
            </Typography>
            <CheckboxHorizontalListGroup
              first={"Weekday"}
              second={"Weekend"}
              third={"All"}
            />

              <div className="mb-1 flex items-center gap-4">
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
              />
            <Button size="lg" className="my-3">POST</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
