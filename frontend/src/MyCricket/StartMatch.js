import { Button } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StartMatch() {
  const location = useLocation();
  const navigate = useNavigate();
  const obj = location.state || {};

  const [team1, setTeam1] = useState(obj.team1 || "");
  const [team2, setTeam2] = useState(obj.team2 || "");

  useEffect(() => {
    console.log("Returned navigation state:", obj);

    if (obj.team && obj.selecting) {
      if (obj.selecting === "team1") {
        setTeam1(obj.team[0].teamname);
      } else if (obj.selecting === "team2") {
        setTeam2(obj.team[0].teamname);
      }
    }
  }, [location.state]);

  function handleSubmit1() {
    navigate("/selectteam", {
      state: {
        selecting: "team1",
        team1,
        team2,
      },
    });
  }

  function handleSubmit2() {
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
        team1,
        team2,
      },
    });
  }

  const isValid = team1 === "" || team2 === "";

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2 p-2 items-center">
        <Button onClick={handleSubmit1} className="rounded-full h-32 w-32 text-6xl">
          +
        </Button>
        <div>{team1 === "" ? "Select Team 1" : team1}</div>

        <div className="flex justify-center">
          <img src="vs-button-svgrepo-com.svg" alt="vs" className="h-10" />
        </div>

        <Button onClick={handleSubmit2} className="rounded-full h-32 w-32 text-6xl">
          +
        </Button>
        <div>{team2 === "" ? "Select Team 2" : team2}</div>

        <div className="flex justify-center">
          <Button disabled={isValid} onClick={handleNext}>
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}
