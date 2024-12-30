import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function MatchCard({team1,team2,score1,score2,overs1, overs2,ground,city,date,overs,result}) {
    return (
      <Card className="mt-6 w-96 bg-gray-900">
        <CardBody>
            <div className="flex place-content-between">
          <Typography variant="h5" color="white" className="mb-2">
            {team1}
          </Typography>
          
          <Typography variant="h5" color="white" className="mb-2">
            {`${score1}`}{`(${overs1})`}
          </Typography>
          </div>
          <div className="flex place-content-between">
          <Typography variant="h5" color="white" className="mb-2">
            {team2}
          </Typography>
          <Typography variant="h5" color="white" className="mb-2">
            {`${score2}`}{`(${overs2})`}
          </Typography>
          </div>
          <div className="flex flex-col items-center">
          <Typography >
            {ground}
          </Typography>
          <Typography >
            {city}
          </Typography>
          <Typography >
            {date}
          </Typography>
          <Typography >
            {overs} 
          </Typography>
          <Typography >
            {result}
          </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex flex-col">
          <Button className="text-black bg-white">Open Full Scorecard</Button>
        </CardFooter>
      </Card>
    );
  }