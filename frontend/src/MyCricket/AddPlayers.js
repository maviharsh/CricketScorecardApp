import { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import PlayerSearchForm from "./PlayerSearchForm";

export default function AddPlayers() {
  const [players, setPlayers] = useState([]); 

  const handleSearch = () => {
    if (players.length < 11) {
      setPlayers([...players, `Player ${players.length + 1}`]); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (players.length === 11) {
      alert("Team added successfully!"); 
    } else {
      alert("You must add 11 players before submitting.");
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
    </div>
  );
}
