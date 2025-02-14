import { Link } from "react-router-dom";
import LookingCard from "../Elements/LookingCard";
import { Button } from "@material-tailwind/react";
import axios from "axios"; 
import { useState, useEffect } from "react";

export default function LookingHomePage() {
  const [lookingdata, setLookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          "umpirelookingform",
          "scorerlookingform",
          "groundlookingform",
          "opponentform",
          "teamsfortournamentform",
          "teamforplayerform",
          "playerforteamform",
          "tournamenttoparticipateform",
        ];

        const requests = endpoints.map(endpoint => 
          axios.get(`${process.env.REACT_APP_API_URL}/api/${endpoint}`)
        );

        const responses = await Promise.all(requests);
        const allData = responses.map(res => res.data).flat(); 
        
        setLookingData(allData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

 
  return (
    <>
      <div className="flex justify-end">
        <Link to="/postpage">
          <Button variant="gradient" className="m-5">POST</Button>
        </Link>
      </div>
      <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-20">
        {lookingdata.map((looking, index) => (
          <LookingCard key={index} data={looking} />
        ))}
      </div>
    </>
  );
}
