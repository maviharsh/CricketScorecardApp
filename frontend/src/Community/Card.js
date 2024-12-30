import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
   
  export default function Carding() {
    return (
      <Card className="max-w-80">
        <CardHeader floated={false} className="h-60">
          <img src="man-red-hair-svgrepo-com.svg" alt="profile-picture" className="h-60" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Natalie Paisley
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            CEO / Co-Founder
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
        <button>
          <Link to="/message">
          <img src="message-regular.svg" alt="imagica"className="h-8" />
          </Link>
          </button>
        </CardFooter>
      </Card>
    );
  }