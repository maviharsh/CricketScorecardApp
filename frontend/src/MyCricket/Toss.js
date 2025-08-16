import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Toss() {
  const navigate = useNavigate();
  const { matchId } = useParams(); // Get matchId from the URL, e.g., /toss/60b8e2f...
  const { state: locationState } = useLocation();

  // Get team info from the state passed by the previous route for display purposes
  const { team1Name, team2Name, team1Id, team2Id } = locationState || {};

  const [tossWinnerId, setTossWinnerId] = useState("");
  const [decision, setDecision] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTossWinnerSelect = (teamId) => {
    setTossWinnerId(teamId);
    setError(""); // Clear error when a selection is made
  };

  const handleDecisionSelect = (selectedDecision) => {
    setDecision(selectedDecision);
    setError(""); // Clear error when a selection is made
  };

  const handleSubmit = async () => {
    if (!tossWinnerId || !decision) {
      setError("Please select the toss winner and their decision.");
      return;
    }
    setLoading(true);
    try {
      // The backend will handle all logic of creating the inning
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/matches/${matchId}/toss`,
        {
          tossWinnerId,
          decision,
        },
        { withCredentials: true }
      );

      // Navigate to the scoreboard page. It will fetch its own data using the matchId.
      navigate(`/scoreboard/${matchId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process toss. Please try again.");
      setLoading(false);
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
                  onClick={() => handleTossWinnerSelect(team1Id)}
                  color={tossWinnerId === team1Id ? "blue" : "blue-gray"}
                  disabled={!team1Id}
                >
                  {team1Name || "Team 1"}
                </Button>
                <Button
                  onClick={() => handleTossWinnerSelect(team2Id)}
                  color={tossWinnerId === team2Id ? "blue" : "blue-gray"}
                  disabled={!team2Id}
                >
                  {team2Name || "Team 2"}
                </Button>
              </div>
            </div>

            {tossWinnerId && (
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Elected to:
                </Typography>
                <div className="flex justify-evenly gap-4">
                   <Button
                      onClick={() => handleDecisionSelect("bat")}
                      color={decision === "bat" ? "green" : "blue-gray"}
                    >
                      Bat
                    </Button>
                    <Button
                      onClick={() => handleDecisionSelect("bowl")}
                      color={decision === "bowl" ? "green" : "blue-gray"}
                    >
                      Bowl
                    </Button>
                </div>
              </div>
            )}

            {error && (
              <Typography color="red" variant="small" className="mt-2 text-center">
                {error}
              </Typography>
            )}

            <Button
              className="text-xl mt-4"
              color="blue"
              disabled={!tossWinnerId || !decision || loading}
              onClick={handleSubmit}
            >
              {loading ? "Starting Match..." : "Let's Play"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}