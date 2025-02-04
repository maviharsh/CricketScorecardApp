import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
   
  export default function Carding({groundname,personname,address,city,contact,gmail,minboundary,maxboundary,minfees,maxfees,src}) {
    return (
      <Card className="max-w-80">
        <CardHeader floated={false} className="h-60">
          <img src={src} alt="profile-picture" className="h-60 w-60" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {groundname}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {personname}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {address}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {city}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {contact}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {gmail}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
        <div className="flex flex-col">
       <div className="flex place-content-between">
        <Typography color="blue-gray" className="font-medium" textGradient>
          {minboundary}m
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
          {maxboundary}m
          </Typography>
        </div>
        <div className="flex gap-10">
        <Typography color="blue-gray" className="font-medium" textGradient>
            Rs.{minfees}/PD
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
          Rs.{maxfees}/PM
          </Typography>
        </div>
        </div>
        </CardFooter>
      </Card>
    );
  }