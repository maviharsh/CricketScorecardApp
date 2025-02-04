import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
   
  export default function Carding({companyname,personname,address,city,details,contact,youtubelink,facebooklink,src}) {
    return (
      <Card className="max-w-80">
        <CardHeader floated={false} className="h-60">
          <img src={src} alt="profile-picture" className="h-60 w-60" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {companyname}
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
            {details}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
       <div className="flex gap-10">
        <Typography color="blue-gray" className="font-medium" textGradient>
            Rs.{youtubelink}/PD
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
          Rs.{facebooklink}/PM
          </Typography>
        </div>
        </CardFooter>
      </Card>
    );
  }