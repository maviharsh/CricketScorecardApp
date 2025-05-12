import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MatchDetailsForm({ head = "Match Details", photo = "match-icon.png" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { team1, team2 } = location.state || {};

  const [formData, setFormData] = useState({
    maxOvers: "",
    startDate: "",
    matchTime: "",
    ground: "",
    city: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { maxOvers, startDate, matchTime, ground, city } = formData;

    // Validation
    if (!maxOvers || !startDate || !matchTime || !ground || !city) {
      setError("All fields are required");
      return;
    }
    if (isNaN(maxOvers) || maxOvers <= 0) {
      setError("Number of overs must be a positive number");
      return;
    }

    try {
      // Send data to backend
      const response = await fetch("http://localhost:4000/api/creatematch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team1Id: team1,
          team2Id: team2,
          maxOvers: parseInt(maxOvers),
          startDate,
          matchTime,
          ground,
          city,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create match");
      }

      const match = await response.json();

      // Navigate to TossPage with match data
      navigate("/tosspage", {
        state: {
          matchId: match._id,
          team1,
          team2,
          maxOvers: match.maxOvers,
        },
      });
    } catch (err) {
      setError("Error creating match: " + err.message);
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
            <img src={photo} alt="match-icon" className="h-16" />
          </div>
          <Typography variant="h5" color="white">
            {head}
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                NO. OF OVERS
              </Typography>
              <Input
                name="maxOvers"
                type="number"
                value={formData.maxOvers}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                START DATE
              </Typography>
              <Input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                MATCH TIMINGS
              </Typography>
              <Input
                name="matchTime"
                type="time"
                value={formData.matchTime}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="my-4 flex items-center gap-4">
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Ground
                </Typography>
                <Input
                  name="ground"
                  value={formData.ground}
                  onChange={handleChange}
                  containerProps={{ className: "min-w-[72px]" }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  CITY
                </Typography>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  containerProps={{ className: "min-w-[72px]" }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>

            {error && (
              <Typography color="red" variant="small" className="mb-2">
                {error}
              </Typography>
            )}

            <Button type="submit" size="lg" className="w-full">
              NEXT
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}