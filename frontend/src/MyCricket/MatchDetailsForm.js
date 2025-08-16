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
import axios from "axios"; // Using axios is often cleaner than fetch

// This component can be simplified as it just wraps the form
export default function MatchDetails({ head, photo }) {
    return <MatchDetailsForm head={head} photo={photo} />;
}


function MatchDetailsForm({ head = "Match Details", photo = "match-icon.png" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { team1Id, team1Name, team2Id, team2Name } = location.state || {};

  const [formData, setFormData] = useState({
    maxOvers: "",
    startDate: "",
    matchTime: "",
    ground: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!maxOvers || !startDate || !matchTime || !ground || !city) {
      setError("All fields are required");
      return;
    }
    if (isNaN(maxOvers) || maxOvers <= 0) {
      setError("Number of overs must be a positive number");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // ✅ FIX: Send team1Id and team2Id instead of names
      const payload = {
        team1Id, // The backend expects the ID
        team2Id, // The backend expects the ID
        maxOvers: parseInt(maxOvers),
        startDate,
        matchTime,
        ground,
        city,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/matches`,
        payload,
        { withCredentials: true }
      );
      
      const match = response.data;

      // ✅ FIX: Navigate to the correct dynamic URL for the toss page
      navigate(`/toss/${match._id}`, {
        state: { // Pass names and IDs to the toss page for display
          team1Id: team1Id,
          team1Name: team1Name,
          team2Id: team2Id,
          team2Name: team2Name,
        },
      });

    } catch (err) {
      setError(err.response?.data?.error || "Error creating match");
    } finally {
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
          <div className="mb-4 h-20 p-6 text-white">
            <img src={photo} alt="match-icon" className="h-16" />
          </div>
          <Typography variant="h5" color="white">
            {head}
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* NO CHANGES TO THE INPUTS BELOW */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                NO. OF OVERS
              </Typography>
              <Input name="maxOvers" type="number" value={formData.maxOvers} onChange={handleChange}/>
            </div>

            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                START DATE
              </Typography>
              <Input name="startDate" type="date" value={formData.startDate} onChange={handleChange}/>
            </div>
            
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                MATCH TIMINGS
              </Typography>
              <Input name="matchTime" type="time" value={formData.matchTime} onChange={handleChange}/>
            </div>

            <div className="my-4 flex items-center gap-4">
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  Ground
                </Typography>
                <Input name="ground" value={formData.ground} onChange={handleChange}/>
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                  CITY
                </Typography>
                <Input name="city" value={formData.city} onChange={handleChange}/>
              </div>
            </div>

            {error && (
              <Typography color="red" variant="small" className="mb-2">
                {error}
              </Typography>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "CREATING..." : "NEXT"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}