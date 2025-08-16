import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StartMatch() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state || {};

  // Initialize state with the object structure from the start
  const [team1, setTeam1] = useState(locationState.team1 || { name: "", id: "" });
  const [team2, setTeam2] = useState(locationState.team2 || { name: "", id: "" });

  useEffect(() => {
    // This effect runs when you navigate back from the team selection page
    if (locationState.team && locationState.selecting) {
      if (locationState.selecting === "team1") {
        setTeam1(locationState.team);
      } else if (locationState.selecting === "team2") {
        setTeam2(locationState.team);
      }
    }
  }, [locationState]);

  function handleSelectTeam1() {
    navigate("/selectteam", {
      state: {
        selecting: "team1",
        team1,
        team2,
      },
    });
  }

  function handleSelectTeam2() {
    navigate("/selectteam", {
      state: {
        selecting: "team2",
        team1,
        team2,
      },
    });
  }

  function handleNext() {
    navigate("/matchdetails", {
      state: {
        team1Id: team1.id,
        team1Name: team1.name,
        team2Id: team2.id,
        team2Name: team2.name,
      },
    });
  }

  // Correctly check if both team IDs exist to enable the button
  const isReadyForNext = team1.id && team2.id;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col gap-4 p-4 items-center">
        <Button onClick={handleSelectTeam1} className="rounded-full h-32 w-32 text-6xl flex items-center justify-center">
          +
        </Button>
        {/*
          FIX 1: Check for team1.id to see if a team is selected.
          FIX 2: Display the team's name (team1.name), not the whole object.
        */}
        <div className="text-lg font-semibold">{!team1.id ? "Select Team 1" : team1.name}</div>

        <div className="flex justify-center my-2">
          <img src="vs-button-svgrepo-com.svg" alt="vs" className="h-10" />
        </div>

        <Button onClick={handleSelectTeam2} className="rounded-full h-32 w-32 text-6xl flex items-center justify-center">
          +
        </Button>
        {/*
          FIX 3: Check for team2.id and display team2.name.
        */}
        <div className="text-lg font-semibold">{!team2.id ? "Select Team 2" : team2.name}</div>

        <div className="flex justify-center mt-6">
          {/*
            FIX 4: Disable the button based on the corrected logic.
          */}
          <Button disabled={!isReadyForNext} onClick={handleNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}