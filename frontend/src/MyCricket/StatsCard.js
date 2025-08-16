import {
    Card,
    Button
  } from "@material-tailwind/react";
   
  export default function StatsCard() {
    return (
      <Card className="max-w-80 p-1">
        <div>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">123</div>Matches</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">110</div>Innings</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">23</div>No</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">3608</div>RUNS</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">103</div>HIGHEST</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">28</div>AVG</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">123</div>SR</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">29</div>30S</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">18</div>50S</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">10</div>100S</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">501</div>4S</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">49</div>6S</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">11</div>DUCKS</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">100</div>WON</Button>
        <Button variant="gradient" className="m-1 h-24 w-24 pl-5"><div className="text-3xl mb-1">23</div>LOST</Button>
        </div>
      </Card>
    );
  }
  