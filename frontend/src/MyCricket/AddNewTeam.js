import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
  export default function AddNewTeam() {
    return (
       
        <div className="flex justify-center m-5">
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Your Team
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Team Name
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              City
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Captain Name
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

          </div>
          
          <Button className="mt-6" fullWidth>
            ADD Players
          </Button>
          
        </form>
      </Card>
      </div>
    );
  }