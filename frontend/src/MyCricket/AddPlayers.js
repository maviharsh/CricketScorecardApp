import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import PlayerSearchForm from "./PlayerSearchForm";
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";

export default function AddPlayers() {
  const location=useLocation();
  const obj=location.state||{};
  console.log(obj);
  const [players, setPlayers] = useState([]); 

  const handleSearch = (player) => {
    if (players.length < 11) {
      console.log("player is --->",player);
      setPlayers([...players, `${player}`]); 
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (players.length === 11) {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/addteam`,
          {
               teamname:obj.teamname,
              city:obj.city,
              captainname:obj.captainname,
              players:players,
          },
          {withCredentials:true},
        )
          .then((response)=>{
            console.log(response);
          })
          .catch((err)=>{
            console.log(err);
          })
    } else {
      toast.error("You must add 11 players before submitting.");
    }
  };

  return (
    <div className="flex justify-center m-5">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Your Team
        </Typography>

        <PlayerSearchForm onSearch={handleSearch} />

        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <Button type="submit" className="mt-6" fullWidth>
            ADD Team
          </Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}
