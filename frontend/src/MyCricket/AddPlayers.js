import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import PlayerSearchForm from "./PlayerSearchForm";
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";

export default function AddPlayers() {
 const location = useLocation();
 const navigate=useNavigate();
    const { teamname, city } = location.state || {};
    const [players, setPlayers] = useState([]); 
    const [playerIds, setPlayerIds] = useState([]);
    const [captain, setCaptain] = useState(null); // { id: '...', name: '...' }

    const handleAddPlayer = (playerId, playerName) => {
        if (players.length < 11 && !playerIds.includes(playerId)) {
            setPlayers([...players, playerName]);
            setPlayerIds([...playerIds, playerId]);
        }
    };

    const handleSelectCaptain = (captainId, captainName) => {
        setCaptain({ id: captainId, name: captainName });
        // Automatically add captain to the players list if not already there
        if (!playerIds.includes(captainId)) {
            handleAddPlayer(captainId, captainName);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (players.length > 1 && captain) {
            try {
                // ✅ FIX: Use correct route '/api/teams' and send captainId
                await axios.post(`${process.env.REACT_APP_API_URL}/api/teams`, {
                    teamname,
                    city,
                    captainId: captain.id,
                    playerIds: playerIds,
                }, { withCredentials: true });
                toast.success("Team created successfully!");
                navigate('/selectteam'); // or wherever you want to go next
            } catch (err) {
                toast.error(err.response?.data?.error || "Failed to create team.");
            }
        } else {
            toast.error("You must select a captain and atleast 2 unique players.");
        }
    };

  return (
    <div className="flex justify-center m-5">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Your Team
        </Typography>

         <Typography variant="h5">Select Captain</Typography>
            {captain ? <p>Captain: {captain.name}</p> : <PlayerSearchForm onSearch={handleSelectCaptain} />}
            
            {/* Player Selection */}
            <Typography variant="h5">Add Players ({players.length}/11)</Typography>
            <PlayerSearchForm onSearch={handleAddPlayer} />

        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <Button type="submit" className="mt-6" fullWidth >
            ADD Team
          </Button> 
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}
