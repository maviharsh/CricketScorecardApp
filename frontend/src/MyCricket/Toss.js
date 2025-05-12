import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Toss() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    matchId,
    team1 = "Team A",
    team2 = "Team B",
    maxOvers = 20,
  } = location.state || {};

  const [tossWinner, setTossWinner] = useState("");
  const [decision, setDecision] = useState("");
  const [error, setError] = useState("");

  // Debug state changes
  useEffect(() => {
    console.log("Current state:", {
      tossWinner,
      decision,
      matchId,
      team1,
      team2,
      maxOvers,
    });
  }, [tossWinner, decision, matchId, team1, team2, maxOvers]);

  const handleTossWinner = (team) => {
    console.log("Selected toss winner:", team);
    setTossWinner(team);
    setError("");
  };

  const handleDecision = (value) => {
    console.log("Selected decision:", value);
    setDecision(value);
    setError("");
  };

  const handleSubmit = async () => {
    console.log("Submitting toss data:", {
      matchId,
      tossWinner,
      decision,
      inning: {
        inningNumber: 1,
        battingTeamId:
          decision === "bat"
            ? tossWinner
            : tossWinner === team1
            ? team2
            : team1,
        bowlingTeamId:
          decision === "bat"
            ? tossWinner === team1
              ? team2
              : team1
            : tossWinner,
      },
    });

    if (!tossWinner || !decision) {
      setError("Please select toss winner and decision");
      return;
    }

    if (!matchId) {
      setError("Missing match ID. Please start the match again.");
      return;
    }

    try {
      const battingTeam =
        decision === "bat" ? tossWinner : tossWinner === team1 ? team2 : team1;
      const bowlingTeam = battingTeam === team1 ? team2 : team1;

      const response = await fetch(
        `http://localhost:4000/api/${matchId}/toss`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tossWinner,
            decision,
            inning: {
              inningNumber: 1,
              battingTeamId: battingTeam,
              bowlingTeamId: bowlingTeam,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fetch response:", response.status, errorText);
        throw new Error(
          `Failed to update toss: ${response.status} - ${errorText}`
        );
      }

      const { match, inning } = await response.json();
      console.log("Toss response:", { match, inning });

      navigate("/scoringpage", {
        state: {
          matchId,
          team1,
          team2,
          maxOvers,
          batting: battingTeam,
          inningId: inning._id,
        },
      });
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(`Error processing toss: ${err.message}`);
    }
  };

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
            <img src="toss-icon.png" alt="toss-icon" className="h-16" />
          </div>
          <Typography variant="h5" color="white">
            Toss
          </Typography>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-6">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Who won the toss?
              </Typography>
              <div className="flex justify-evenly gap-4">
                <Button
                  variant={tossWinner === team1 ? "filled" : "outlined"}
                  color={tossWinner === team1 ? "blue" : "gray"}
                  className="text-lg"
                  onClick={() => handleTossWinner(team1)}
                  disabled={!team1}
                >
                  {team1}
                </Button>
                <Button
                  variant={tossWinner === team2 ? "filled" : "outlined"}
                  color={tossWinner === team2 ? "blue" : "gray"}
                  className="text-lg"
                  onClick={() => handleTossWinner(team2)}
                  disabled={!team2}
                >
                  {team2}
                </Button>
              </div>
            </div>

            {tossWinner && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Winner of the toss elected to:
                </Typography>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="bat"
                        checked={decision === "bat"}
                        onChange={() => handleDecision("bat")}
                        className="mr-2"
                      />
                      Bat
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="bowl"
                        checked={decision === "bowl"}
                        onChange={() => handleDecision("bowl")}
                        className="mr-2"
                      />
                      Bowl
                    </label>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <Typography color="red" variant="small" className="mt-2">
                {error}
              </Typography>
            )}

            <Button
              className="text-xl mt-4"
              color="blue"
              disabled={!tossWinner || !decision}
              onClick={handleSubmit}
            >
              Let's Play
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
