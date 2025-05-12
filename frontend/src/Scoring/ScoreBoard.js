import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Autosuggest from "react-autosuggest";
import { BOLD, CATCH, HIT_WICKET, RUN_OUT, STUMP } from "../constants/OutType";
import "./ScoreBoard.css";
import { RadioGroupBoxstyle } from "./ui/RadioGroupBoxstyle";

// Update constants in ../constants/BattingStatus.js
// export const BATTING = 'batting';
// export const OUT = 'out';

export default function ScoreBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { matchId, team1, team2, maxOvers, batting, inningId: initialInningId } = location.state || {};

  const [inningNo, setInningNo] = useState(1);
  const [inningId, setInningId] = useState(initialInningId || "");
  const [match, setMatch] = useState({
    inning1: { batters: [], bowlers: [], runs: 0, wickets: 0, overs: 0, extra: { total: 0, wide: 0, noBall: 0 } },
    inning2: { batters: [], bowlers: [], runs: 0, wickets: 0, overs: 0, extra: { total: 0, wide: 0, noBall: 0 } },
  });
  const [currentRunStack, setCurrentRunStack] = useState([]);
  const [totalRuns, setTotalRuns] = useState(0);
  const [extras, setExtras] = useState({ total: 0, wide: 0, noBall: 0 });
  const [runsByOver, setRunsByOver] = useState(0);
  const [wicketCount, setWicketCount] = useState(0);
  const [totalOvers, setTotalOvers] = useState(0);
  const [ballCount, setBallCount] = useState(0);
  const [overCount, setOverCount] = useState(0);
  const [recentOvers, setRecentOvers] = useState([]);
  const [batter1, setBatter1] = useState({});
  const [batter2, setBatter2] = useState({});
  const [battingOrder, setBattingOrder] = useState(0);
  const [isBatter1Edited, setBatter1Edited] = useState(false);
  const [isBatter2Edited, setBatter2Edited] = useState(false);
  const [isBowlerEdited, setBowlerEdited] = useState(false);
  const [bowler, setBowler] = useState({});
  const [bowlers, setBowlers] = useState([]);
  const [inputBowler, setInputBowler] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [outType, setOutType] = useState("");
  const [runOutPlayerId, setRunOutPlayerId] = useState("");
  const [remainingBalls, setRemainingBalls] = useState(maxOvers * 6);
  const [remainingRuns, setRemainingRuns] = useState(0);
  const [strikeValue, setStrikeValue] = useState("strike");
  const [isNoBall, setNoBall] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [hasNameSuggested, setNameSuggested] = useState(false);
  const [hasMatchEnded, setMatchEnded] = useState(false);
  const [error, setError] = useState("");
  const [batters, setBatters] = useState([]);
  const [currentOverId, setCurrentOverId] = useState(null);

  useEffect(() => {
    if (!matchId || !inningId) {
      setError("Missing match or inning ID. Redirecting...");
      setTimeout(() => navigate("/matchdetails"), 2000);
      return;
    }

    const endInningButton = document.getElementById("end-inning");
    if (endInningButton) {
      endInningButton.disabled = true;
    }

    const fetchInningData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/innings/${inningId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch inning data: ${response.statusText}`);
        }
        const inning = await response.json();
        setTotalRuns(inning.runs || 0);
        setWicketCount(inning.wickets || 0);
        setTotalOvers(inning.overs || 0);
        setBallCount(inning.balls || 0);
        setExtras(inning.extras || { total: 0, wide: 0, noBall: 0 });
        setBatters(inning.batters.map(b => ({
          id: b._id,
          playerId: b.playerId,
          runs: b.runs,
          balls: b.balls,
          fours: b.fours || 0,
          sixes: b.sixes || 0,
          strikeRate: b.strikeRate || 0,
          onStrike: b.onStrike,
          battingOrder: b.battingOrder,
          battingStatus: b.battingStatus,
        })) || []);
        setBowlers(inning.bowlers.map(b => ({
          id: b._id,
          playerId: b.playerId,
          overs: b.overs,
          maidens: b.maidens || 0,
          runs: b.runs,
          wickets: b.wickets,
          noBalls: b.noBalls || 0,
          wides: b.wides || 0,
          economy: b.economy || 0,
        })) || []);
        setRecentOvers(inning.oversList.map(o => ({
          overNo: o.overNumber,
          bowler: o.bowlerName, // Backend should return playerId or adjust to playerId
          runs: o.runs,
          stack: o.deliveries,
        })) || []);
        if (inning.oversList.length > 0) {
          setCurrentOverId(inning.oversList[inning.oversList.length - 1]._id);
          setCurrentRunStack(inning.oversList[inning.oversList.length - 1].deliveries);
        }
      } catch (error) {
        console.error("Error fetching inning data:", error);
        setError(`Failed to load inning data: ${error.message}`);
      }
    };
    fetchInningData();
  }, [inningId, maxOvers, batting, team1, team2, matchId, navigate]);

 const handleBatter1Blur = async (e) => {
  let playerId = e.target.value.trim();
  if (!playerId) {
    setError("Batter name is required");
    e.target.disabled = false;
    return;
  }
  playerId = playerId.charAt(0).toUpperCase() + playerId.slice(1);
  e.target.value = playerId;
  e.target.disabled = true;

  try {
    if (!matchId || !inningId) {
      throw new Error("Missing matchId or inningId");
    }
    const existingBatter = batters.find((b) => b.playerId.toLowerCase() === playerId.toLowerCase());
    if (existingBatter) {
      throw new Error(`Batter ${playerId} already exists in this inning`);
    }

    if (isBatter1Edited) {
      const response = await fetch(`http://localhost:4000/api/batters/${batter1.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to update batter: ${errorData.error || response.statusText}`);
      }
      setBatter1((state) => ({ ...state, playerId }));
      setBatter1Edited(false);
    } else {
      console.log("Creating batter with payload:", {
        matchId,
        playerId,
        battingOrder: battingOrder + 1,
        onStrike: strikeValue === "strike",
      });
      const response = await fetch(`http://localhost:4000/api/innings/${inningId}/batters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          playerId,
          battingOrder: battingOrder + 1,
          onStrike: strikeValue === "strike",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(`Failed to create batter: ${errorData.error || response.statusText}${errorData.missing ? ` (Missing: ${JSON.stringify(errorData.missing)})` : ""}`);
      }
      const batter = await response.json();
      setBatter1({
        id: batter._id,
        playerId: batter.playerId,
        runs: batter.runs || 0,
        balls: batter.balls || 0,
        fours: batter.fours || 0,
        sixes: batter.sixes || 0,
        strikeRate: batter.strikeRate || 0,
        onStrike: batter.onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: batter.battingStatus || "batting",
      });
      setBatters((state) => [
        ...state,
        {
          id: batter._id,
          playerId: batter.playerId,
          runs: batter.runs || 0,
          balls: batter.balls || 0,
          fours: batter.fours || 0,
          sixes: batter.sixes || 0,
          strikeRate: batter.strikeRate || 0,
          onStrike: batter.onStrike,
          battingOrder: batter.battingOrder,
          battingStatus: batter.battingStatus || "batting",
        },
      ]);
      setBattingOrder(battingOrder + 1);
    }
  } catch (error) {
    console.error("Error handling batter1:", error);
    setError(error.message);
    e.target.disabled = false;
  }
};
  
const handleBatter2Blur = async (e) => {
  let playerId = e.target.value.trim();
  if (!playerId) {
    setError("Batter name is required");
    e.target.disabled = false;
    return;
  }
  playerId = playerId.charAt(0).toUpperCase() + playerId.slice(1);
  e.target.value = playerId;
  e.target.disabled = true;

  try {
    if (!matchId || !inningId) {
      throw new Error("Missing matchId or inningId");
    }
    const existingBatter = batters.find((b) => b.playerId.toLowerCase() === playerId.toLowerCase());
    if (existingBatter) {
      throw new Error(`Batter ${playerId} already exists in this inning`);
    }

    if (isBatter2Edited) {
      const response = await fetch(`http://localhost:4000/api/batters/${batter2.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to update batter: ${errorData.error || response.statusText}`);
      }
      setBatter2((state) => ({ ...state, playerId }));
      setBatter2Edited(false);
    } else {
      console.log("Creating batter with payload:", {
        matchId,
        playerId,
        battingOrder: battingOrder + 1,
        onStrike: strikeValue === "non-strike",
      });
      const response = await fetch(`http://localhost:4000/api/innings/${inningId}/batters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          playerId,
          battingOrder: battingOrder + 1,
          onStrike: strikeValue === "non-strike",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(`Failed to create batter: ${errorData.error || response.statusText}${errorData.missing ? ` (Missing: ${JSON.stringify(errorData.missing)})` : ""}`);
      }
      const batter = await response.json();
      setBatter2({
        id: batter._id,
        playerId: batter.playerId,
        runs: batter.runs || 0,
        balls: batter.balls || 0,
        fours: batter.fours || 0,
        sixes: batter.sixes || 0,
        strikeRate: batter.strikeRate || 0,
        onStrike: batter.onStrike,
        battingOrder: batter.battingOrder,
        battingStatus: batter.battingStatus || "batting",
      });
      setBatters((state) => [
        ...state,
        {
          id: batter._id,
          playerId: batter.playerId,
          runs: batter.runs || 0,
          balls: batter.balls || 0,
          fours: batter.fours || 0,
          sixes: batter.sixes || 0,
          strikeRate: batter.strikeRate || 0,
          onStrike: batter.onStrike,
          battingOrder: batter.battingOrder,
          battingStatus: batter.battingStatus || "batting",
        },
      ]);
      setBattingOrder(battingOrder + 1);
    }
  } catch (error) {
    console.error("Error handling batter2:", error);
    setError(error.message);
    e.target.disabled = false;
  }
};

  const handleBowlerBlur = async (e) => {
    let playerId = e.target.value.trim();
    if (!playerId) return;
    playerId = playerId.charAt(0).toUpperCase() + playerId.slice(1);
    setInputBowler(playerId);
    e.target.value = playerId;
    e.target.disabled = true;

    try {
      if (isBowlerEdited) {
        const response = await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId }),
        });
        if (!response.ok) {
          throw new Error("Failed to update bowler");
        }
        setBowler((state) => ({ ...state, playerId }));
        setBowlerEdited(false);
      } else {
        if (hasNameSuggested) {
          setNameSuggested(false);
        } else {
          const response = await fetch(`http://localhost:4000/api/innings/${inningId}/bowlers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              matchId,
              playerId,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to create bowler");
          }
          const bowlerData = await response.json();
          setBowler({
            id: bowlerData._id,
            playerId: bowlerData.playerId,
            overs: bowlerData.overs || 0,
            maidens: bowlerData.maidens || 0,
            runs: bowlerData.runs || 0,
            wickets: bowlerData.wickets || 0,
            noBalls: bowlerData.noBalls || 0,
            wides: bowlerData.wides || 0,
            economy: bowlerData.economy || 0,
          });
          setBowlers((state) => [...state, {
            id: bowlerData._id,
            playerId: bowlerData.playerId,
            overs: bowlerData.overs || 0,
            maidens: bowlerData.maidens || 0,
            runs: bowlerData.runs || 0,
            wickets: bowlerData.wickets || 0,
            noBalls: bowlerData.noBalls || 0,
            wides: bowlerData.wides || 0,
            economy: bowlerData.economy || 0,
          }]);
        }
      }
    } catch (error) {
      console.error("Error handling bowler:", error);
      setError(`Error updating bowler: ${error.message}`);
      e.target.disabled = false;
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const suggestionArr = inputValue.length === 0 ? [] : bowlers.filter((bowlerObj) =>
      bowlerObj.playerId.toLowerCase().includes(inputValue)
    );
    setSuggestions(suggestionArr);
  };

  const getSuggestionValue = (suggestion) => {
    setBowler({
      id: suggestion.id,
      playerId: suggestion.playerId,
      overs: suggestion.overs,
      maidens: suggestion.maidens,
      runs: suggestion.runs,
      wickets: suggestion.wickets,
      noBalls: suggestion.noBalls,
      wides: suggestion.wides,
      economy: suggestion.economy,
    });
    setNameSuggested(true);
    return suggestion.playerId;
  };

  const inputProps = {
    value: inputBowler,
    onChange: (e, { newValue }) => {
      setInputBowler(newValue);
    },
    onBlur: handleBowlerBlur,
  };

  const ensureOver = async () => {
    if (!currentOverId && bowler.id) {
      try {
        const response = await fetch(`http://localhost:4000/api/innings/${inningId}/overs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matchId,
            overNumber: overCount + 1,
            bowlerId: bowler.playerId, // Backend expects bowlerName; adjust if schema changes
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create over");
        }
        const over = await response.json();
        setCurrentOverId(over._id);
        setCurrentRunStack(over.deliveries || []);
        return over._id;
      } catch (error) {
        console.error("Error creating over:", error);
        setError(`Error creating over: ${error.message}`);
        return null;
      }
    }
    return currentOverId;
  };

  const overCompleted = async (runsByOverParam, currentRunStackParam) => {
    const bowlerNameElement = document.querySelector(".react-autosuggest__input");
    if (overCount + 1 === maxOvers) {
      const endInningButton = document.getElementById("end-inning");
      endInningButton.disabled = false;
    } else {
      bowlerNameElement.disabled = false;
    }
    disableAllScoreButtons();

    try {
      // Update over in backend
      const overId = await ensureOver();
      if (overId) {
        const overResponse = await fetch(`http://localhost:4000/api/overs/${overId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            runs: runsByOverParam,
            deliveries: currentRunStackParam,
          }),
        });
        if (!overResponse.ok) {
          throw new Error("Failed to update over");
        }
      }

      // Update inning overs
      const inningResponse = await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          overs: overCount + 1,
          balls: 0,
        }),
      });
      if (!inningResponse.ok) {
        throw new Error("Failed to update inning");
      }

      // Update bowler stats
      let isMaidenOver = true;
      let countWicket = 0;
      let countNoBall = 0;
      let countWide = 0;
      const deliveries = ["1", "2", "3", "4", "6", "wd"];
      for (let delivery of currentRunStackParam) {
        delivery = delivery.toString();
        if (deliveries.includes(delivery) || delivery.includes("nb")) {
          isMaidenOver = false;
        }
        if (delivery === "W") {
          countWicket++;
        }
        if (delivery.includes("nb")) {
          countNoBall++;
        }
        if (delivery.includes("wd")) {
          countWide++;
        }
      }

      const index = bowlers.findIndex((blr) => blr.id === bowler.id);
      let updatedBowler;
      if (index !== -1) {
        const existingBowler = { ...bowlers[index] };
        existingBowler.overs = existingBowler.overs + 1;
        existingBowler.maidens = isMaidenOver ? existingBowler.maidens + 1 : existingBowler.maidens;
        existingBowler.runs = existingBowler.runs + runsByOverParam;
        existingBowler.wickets = existingBowler.wickets + countWicket;
        existingBowler.noBalls = existingBowler.noBalls + countNoBall;
        existingBowler.wides = existingBowler.wides + countWide;
        existingBowler.economy = Math.round((existingBowler.runs / existingBowler.overs) * 100) / 100;
        bowlers[index] = existingBowler;
        updatedBowler = existingBowler;

        const bowlerResponse = await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            overs: existingBowler.overs,
            maidens: existingBowler.maidens,
            runs: existingBowler.runs,
            wickets: existingBowler.wickets,
            noBalls: existingBowler.noBalls,
            wides: existingBowler.wides,
            economy: existingBowler.economy,
          }),
        });
        if (!bowlerResponse.ok) {
          throw new Error("Failed to update bowler");
        }
      } else {
        updatedBowler = {
          id: bowler.id,
          playerId: bowler.playerId,
          overs: 1,
          maidens: isMaidenOver ? 1 : 0,
          runs: runsByOverParam,
          wickets: countWicket,
          noBalls: countNoBall,
          wides: countWide,
          economy: runsByOverParam,
        };
        setBowlers((state) => [...state, updatedBowler]);

        const bowlerResponse = await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            overs: updatedBowler.overs,
            maidens: updatedBowler.maidens,
            runs: updatedBowler.runs,
            wickets: updatedBowler.wickets,
            noBalls: updatedBowler.noBalls,
            wides: updatedBowler.wides,
            economy: updatedBowler.economy,
          }),
        });
        if (!bowlerResponse.ok) {
          throw new Error("Failed to update bowler");
        }
      }

      setRecentOvers((state) => [
        ...state,
        { overNo: overCount + 1, bowler: bowler.playerId, runs: runsByOverParam, stack: currentRunStackParam },
      ]);
      setInputBowler("");
      setBowler({});
      setCurrentRunStack([]);
      setRunsByOver(0);
      setBallCount(0);
      setOverCount(overCount + 1);
      setCurrentOverId(null);
    } catch (error) {
      console.error("Error completing over:", error);
      setError(`Error completing over: ${error.message}`);
    }
  };

  const newBatter1 = async () => {
    const batter1NameElement = document.getElementById("batter1Name");
    batter1NameElement.value = "";
    batter1NameElement.disabled = false;
    if (batter1.id) {
      try {
        await fetch(`http://localhost:4000/api/batters/${batter1.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ battingStatus: 'out' }),
        });
        setBatters((state) => [
          ...state.filter(b => b.id !== batter1.id),
          {
            id: batter1.id,
            playerId: batter1.playerId,
            runs: batter1.runs,
            balls: batter1.balls,
            fours: batter1.fours,
            sixes: batter1.sixes,
            strikeRate: batter1.strikeRate,
            onStrike: batter1.onStrike,
            battingOrder: batter1.battingOrder,
            battingStatus: 'out',
          },
        ]);
      } catch (error) {
        console.error("Error updating batter1 out status:", error);
        setError(`Error updating batter: ${error.message}`);
      }
    }
    setBatter1({});
  };

  const newBatter2 = async () => {
    const batter2NameElement = document.getElementById("batter2Name");
    batter2NameElement.value = "";
    batter2NameElement.disabled = false;
    if (batter2.id) {
      try {
        await fetch(`http://localhost:4000/api/batters/${batter2.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ battingStatus: 'out' }),
        });
        setBatters((state) => [
          ...state.filter(b => b.id !== batter2.id),
          {
            id: batter2.id,
            playerId: batter2.playerId,
            runs: batter2.runs,
            balls: batter2.balls,
            fours: batter2.fours,
            sixes: batter2.sixes,
            strikeRate: batter2.strikeRate,
            onStrike: batter2.onStrike,
            battingOrder: batter2.battingOrder,
            battingStatus: 'out',
          },
        ]);
      } catch (error) {
        console.error("Error updating batter2 out status:", error);
        setError(`Error updating batter: ${error.message}`);
      }
    }
    setBatter2({});
  };

  const editBatter1Name = () => {
    if (overCount !== maxOvers && wicketCount !== 10 && !hasMatchEnded) {
      const batter1NameElement = document.getElementById("batter1Name");
      batter1NameElement.disabled = false;
      setBatter1Edited(true);
    }
  };

  const editBatter2Name = () => {
    if (overCount !== maxOvers && wicketCount !== 10 && !hasMatchEnded) {
      const batter2NameElement = document.getElementById("batter2Name");
      batter2NameElement.disabled = false;
      setBatter2Edited(true);
    }
  };

  const editBowlerName = () => {
    if (overCount !== maxOvers && wicketCount !== 10 && !hasMatchEnded) {
      const bowlerNameElement = document.querySelector(".react-autosuggest__input");
      bowlerNameElement.disabled = false;
      setBowlerEdited(true);
    }
  };

  const undoWicket = async (isNoBallParam) => {
    if (!isNoBallParam) {
      setBallCount(ballCount - 1);
      setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10);
    }
    setWicketCount(wicketCount - 1);
    const batter = batters[batters.length - 1];
    if (!batter) return;

    try {
      // Restore batter in backend
      await fetch(`http://localhost:4000/api/batters/${batter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ battingStatus: 'batting', outType: null }),
      });

      // Update inning wickets
      await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wickets: wicketCount - 1,
          balls: isNoBallParam ? ballCount : ballCount - 1,
        }),
      });

      // Update over
      if (currentOverId) {
        await fetch(`http://localhost:4000/api/overs/${currentOverId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deliveries: currentRunStack.slice(0, -1),
          }),
        });
      }

      // Update bowler wickets
      if (bowler.id) {
        const index = bowlers.findIndex((blr) => blr.id === bowler.id);
        if (index !== -1) {
          const updatedBowler = { ...bowlers[index], wickets: bowlers[index].wickets - 1 };
          bowlers[index] = updatedBowler;
          await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wickets: updatedBowler.wickets }),
          });
        }
      }

      const { id, playerId, runs, balls, fours, sixes, strikeRate, onStrike, battingOrder } = batter;
      if (batter1.playerId === undefined || batter1.onStrike) {
        const batter1NameElement = document.getElementById("batter1Name");
        batter1NameElement.value = batter.playerId;
        batter1NameElement.disabled = true;
        setBatter1({
          id,
          playerId,
          runs,
          balls,
          fours,
          sixes,
          strikeRate,
          onStrike,
          battingOrder,
          battingStatus: 'batting',
        });
        if (!batter.onStrike) {
          changeStrikeRadio();
          setBatter2((state) => ({ ...state, onStrike: true }));
        }
      } else if (batter2.playerId === undefined || batter2.onStrike) {
        const batter2NameElement = document.getElementById("batter2Name");
        batter2NameElement.value = batter.playerId;
        batter2NameElement.disabled = true;
        setBatter2({
          id,
          playerId,
          runs,
          balls,
          fours,
          sixes,
          strikeRate,
          onStrike,
          battingOrder,
          battingStatus: 'batting',
        });
        if (!batter.onStrike) {
          changeStrikeRadio();
          setBatter1((state) => ({ ...state, onStrike: true }));
        }
      }
      setBatters((state) => state.slice(0, -1));
    } catch (error) {
      console.error("Error undoing wicket:", error);
      setError(`Error undoing wicket: ${error.message}`);
    }
  };

  const undoRun = async (run, isNoBallParam) => {
    try {
      // Update inning
      await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: totalRuns - (isNoBallParam ? run + 1 : run),
          balls: isNoBallParam ? ballCount : ballCount - 1,
        }),
      });

      // Update batter
      const batter = batter1.onStrike ? batter1 : batter2;
      const otherBatter = batter1.onStrike ? batter2 : batter1;
      let updatedBatter;
      if (run % 2 === 0) {
        updatedBatter = {
          ...batter,
          runs: batter.runs - run,
          balls: isNoBallParam ? batter.balls : batter.balls - 1,
          fours: run === 4 ? batter.fours - 1 : batter.fours,
          sixes: run === 6 ? batter.sixes - 1 : batter.sixes,
          strikeRate: ((batter.runs - run) / (isNoBallParam ? batter.balls : batter.balls - 1)) * 100,
        };
      } else {
        updatedBatter = {
          ...otherBatter,
          runs: otherBatter.runs - run,
          balls: isNoBallParam ? otherBatter.balls : otherBatter.balls - 1,
          fours: run === 4 ? otherBatter.fours - 1 : otherBatter.fours,
          sixes: run === 6 ? otherBatter.sixes - 1 : otherBatter.sixes,
          strikeRate: ((otherBatter.runs - run) / (isNoBallParam ? otherBatter.balls : otherBatter.balls - 1)) * 100,
          onStrike: !otherBatter.onStrike,
        };
        changeStrikeRadio();
        switchBatterStrike();
      }

      await fetch(`http://localhost:4000/api/batters/${updatedBatter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: updatedBatter.runs,
          balls: updatedBatter.balls,
          fours: updatedBatter.fours,
          sixes: updatedBatter.sixes,
          strikeRate: updatedBatter.strikeRate,
          onStrike: updatedBatter.onStrike,
        }),
      });

      // Update bowler
      if (bowler.id) {
        const index = bowlers.findIndex((blr) => blr.id === bowler.id);
        if (index !== -1) {
          const updatedBowler = {
            ...bowlers[index],
            runs: bowlers[index].runs - (isNoBallParam ? run + 1 : run),
            economy: ((bowlers[index].runs - (isNoBallParam ? run + 1 : run)) / bowlers[index].overs) || 0,
          };
          bowlers[index] = updatedBowler;
          await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              runs: updatedBowler.runs,
              economy: updatedBowler.economy,
            }),
          });
        }
      }

      // Update over
      if (currentOverId) {
        await fetch(`http://localhost:4000/api/overs/${currentOverId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            runs: runsByOver - (isNoBallParam ? run + 1 : run),
            deliveries: currentRunStack.slice(0, -1),
          }),
        });
      }

      setTotalRuns(totalRuns - (isNoBallParam ? run + 1 : run));
      setRunsByOver(runsByOver - (isNoBallParam ? run + 1 : run));
      if (!isNoBallParam) {
        setBallCount(ballCount - 1);
        setTotalOvers(Math.round((totalOvers - 0.1) * 10) / 10);
      }
      setCurrentRunStack(currentRunStack.slice(0, -1));

      if (batter1.onStrike) {
        if (run % 2 === 0) {
          setBatter1(updatedBatter);
        } else {
          setBatter2(updatedBatter);
        }
      } else {
        if (run % 2 === 0) {
          setBatter2(updatedBatter);
        } else {
          setBatter1(updatedBatter);
        }
      }
    } catch (error) {
      console.error("Error undoing run:", error);
      setError(`Error undoing run: ${error.message}`);
    }
  };

  const undoDelivery = async () => {
    if (currentRunStack.length === 0) return;

    const last = currentRunStack[currentRunStack.length - 1];
    try {
      if (typeof last === "number") {
        await undoRun(last, false);
      } else {
        setCurrentRunStack(currentRunStack.slice(0, -1));
        if (last === "wd") {
          await fetch(`http://localhost:4000/api/innings/${inningId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              runs: totalRuns - 1,
              extras: {
                total: extras.total - 1,
                wide: extras.wide - 1,
                noBall: extras.noBall,
              },
            }),
          });
          setTotalRuns(totalRuns - 1);
          setRunsByOver(runsByOver - 1);
          setExtras((state) => ({
            ...state,
            total: state.total - 1,
            wide: state.wide - 1,
          }));

          if (bowler.id) {
            const index = bowlers.findIndex((blr) => blr.id === bowler.id);
            if (index !== -1) {
              const updatedBowler = {
                ...bowlers[index],
                wides: bowlers[index].wides - 1,
                runs: bowlers[index].runs - 1,
                economy: ((bowlers[index].runs - 1) / bowlers[index].overs) || 0,
              };
              bowlers[index] = updatedBowler;
              await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  wides: updatedBowler.wides,
                  runs: updatedBowler.runs,
                  economy: updatedBowler.economy,
                }),
              });
            }
          }

          if (currentOverId) {
            await fetch(`http://localhost:4000/api/overs/${currentOverId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                runs: runsByOver - 1,
                deliveries: currentRunStack.slice(0, -1),
              }),
            });
          }
        } else if (last === "W") {
          await undoWicket(false);
        } else {
          const lastChar = last.substr(last.length - 1);
          const run = parseInt(lastChar);
          if (isNaN(run)) {
            await fetch(`http://localhost:4000/api/innings/${inningId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                runs: totalRuns - 1,
                extras: {
                  total: extras.total - 1,
                  wide: extras.wide,
                  noBall: extras.noBall - 1,
                },
              }),
            });
            setTotalRuns(totalRuns - 1);
            setRunsByOver(runsByOver - 1);
            setExtras((state) => ({
              ...state,
              total: state.total - 1,
              noBall: state.noBall - 1,
            }));

            if (bowler.id) {
              const index = bowlers.findIndex((blr) => blr.id === bowler.id);
              if (index !== -1) {
                const updatedBowler = {
                  ...bowlers[index],
                  noBalls: bowlers[index].noBalls - 1,
                  runs: bowlers[index].runs - 1,
                  economy: ((bowlers[index].runs - 1) / bowlers[index].overs) || 0,
                };
                bowlers[index] = updatedBowler;
                await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    noBalls: updatedBowler.noBalls,
                    runs: updatedBowler.runs,
                    economy: updatedBowler.economy,
                  }),
                });
              }
            }

            if (currentOverId) {
              await fetch(`http://localhost:4000/api/overs/${currentOverId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  runs: runsByOver - 1,
                  deliveries: currentRunStack.slice(0, -1),
                }),
              });
            }

            if (last !== "nb") {
              await undoWicket(true);
            }
          } else {
            await undoRun(run, true);
          }
        }
      }
    } catch (error) {
      console.error("Error undoing delivery:", error);
      setError(`Error undoing delivery: ${error.message}`);
    }
  };

  const handleStrikeChange = (e) => {
    changeStrikeRadio(e.target.value);
    if (e.target.value === "strike") {
      switchBatterStrike("batter1");
    } else {
      switchBatterStrike("batter2");
    }
  };

  const changeStrikeRadio = (strikeParam) => {
    if (strikeParam === undefined) {
      setStrikeValue(strikeValue === "strike" ? "non-strike" : "strike");
    } else {
      setStrikeValue(strikeParam);
    }
  };

  const switchBatterStrike = async (strikeParam) => {
    try {
      if (strikeParam === undefined) {
        setBatter1((state) => ({ ...state, onStrike: !state.onStrike }));
        setBatter2((state) => ({ ...state, onStrike: !state.onStrike }));
        if (batter1.id) {
          await fetch(`http://localhost:4000/api/batters/${batter1.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: !batter1.onStrike }),
          });
        }
        if (batter2.id) {
          await fetch(`http://localhost:4000/api/batters/${batter2.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: !batter2.onStrike }),
          });
        }
      } else if (strikeParam === "batter1") {
        setBatter1((state) => ({ ...state, onStrike: true }));
        setBatter2((state) => ({ ...state, onStrike: false }));
        if (batter1.id) {
          await fetch(`http://localhost:4000/api/batters/${batter1.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: true }),
          });
        }
        if (batter2.id) {
          await fetch(`http://localhost:4000/api/batters/${batter2.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: false }),
          });
        }
      } else if (strikeParam === "batter2") {
        setBatter1((state) => ({ ...state, onStrike: false }));
        setBatter2((state) => ({ ...state, onStrike: true }));
        if (batter1.id) {
          await fetch(`http://localhost:4000/api/batters/${batter1.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: false }),
          });
        }
        if (batter2.id) {
          await fetch(`http://localhost:4000/api/batters/${batter2.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ onStrike: true }),
          });
        }
      }
    } catch (error) {
      console.error("Error updating strike:", error);
      setError(`Error updating strike: ${error.message}`);
    }
  };

  const handleRun = async (run) => {
    if (!batter1.id || !batter2.id || !bowler.id) {
      setError("Please select two batters and a bowler");
      return;
    }

    const overId = await ensureOver();
    if (!overId) return;

    try {
      // Update inning
      const inningResponse = await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: totalRuns + run,
          balls: isNoBall ? ballCount : ballCount + 1,
          overs: isNoBall ? totalOvers : Math.round((totalOvers + 0.1) * 10) / 10,
        }),
      });
      if (!inningResponse.ok) {
        throw new Error(`Failed to update inning: ${inningResponse.statusText}`);
      }

      // Update batter
      const batter = batter1.onStrike ? batter1 : batter2;
      const otherBatter = batter1.onStrike ? batter2 : batter1;
      const updatedBatter = {
        ...batter,
        runs: batter.runs + run,
        balls: isNoBall ? batter.balls : batter.balls + 1,
        fours: run === 4 ? batter.fours + 1 : batter.fours,
        sixes: run === 6 ? batter.sixes + 1 : batter.sixes,
        strikeRate: ((batter.runs + run) / (isNoBall ? batter.balls : batter.balls + 1)) * 100,
        onStrike: run % 2 === 0 ? batter.onStrike : !batter.onStrike,
      };
      await fetch(`http://localhost:4000/api/batters/${batter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: updatedBatter.runs,
          balls: updatedBatter.balls,
          fours: updatedBatter.fours,
          sixes: updatedBatter.sixes,
          strikeRate: updatedBatter.strikeRate,
          onStrike: updatedBatter.onStrike,
        }),
      });

      // Update other batter's strike
      await fetch(`http://localhost:4000/api/batters/${otherBatter.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onStrike: run % 2 === 0 ? otherBatter.onStrike : !otherBatter.onStrike }),
      });

      // Update bowler
      const index = bowlers.findIndex((blr) => blr.id === bowler.id);
      if (index !== -1) {
        const updatedBowler = {
          ...bowlers[index],
          runs: bowlers[index].runs + run,
          economy: ((bowlers[index].runs + run) / bowlers[index].overs) || 0,
        };
        bowlers[index] = updatedBowler;
        await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            runs: updatedBowler.runs,
            economy: updatedBowler.economy,
          }),
        });
      }

      // Update over
      const delivery = isNoBall ? `nb${run}` : run.toString();
      await fetch(`http://localhost:4000/api/overs/${overId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: runsByOver + run,
          deliveries: [...currentRunStack, delivery],
        }),
      });

      // Update local state
      setTotalRuns(totalRuns + run);
      setRunsByOver(runsByOver + run);
      setCurrentRunStack((state) => [...state, delivery]);
      if (!isNoBall) {
        setBallCount(ballCount + 1);
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10);
      }
      if (inningNo === 2) {
        if (!isNoBall) setRemainingBalls(remainingBalls - 1);
        setRemainingRuns(remainingRuns - run);
      }
      if (batter1.onStrike) {
        setBatter1(updatedBatter);
        setBatter2((state) => ({ ...state, onStrike: run % 2 !== 0 }));
      } else {
        setBatter2(updatedBatter);
        setBatter1((state) => ({ ...state, onStrike: run % 2 !== 0 }));
      }
      if (isNoBall) removeNoBallEffect();

      // Handle over completion
      if (ballCount === 5 && !isNoBall) {
        const arr = [...currentRunStack, delivery];
        await overCompleted(runsByOver + run, arr);
      }
    } catch (error) {
      console.error("Error updating run:", error);
      setError(`Error updating run: ${error.message}`);
    }
  };

  const handleNoBall = async () => {
    const overId = await ensureOver();
    if (!overId) return;

    try {
      // Update inning
      await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: totalRuns + 1,
          extras: {
            total: extras.total + 1,
            wide: extras.wide,
            noBall: extras.noBall + 1,
          },
        }),
      });

      // Update bowler
      const index = bowlers.findIndex((blr) => blr.id === bowler.id);
      if (index !== -1) {
        const updatedBowler = {
          ...bowlers[index],
          noBalls: bowlers[index].noBalls + 1,
          runs: bowlers[index].runs + 1,
          economy: ((bowlers[index].runs + 1) / bowlers[index].overs) || 0,
        };
        bowlers[index] = updatedBowler;
        await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            noBalls: updatedBowler.noBalls,
            runs: updatedBowler.runs,
            economy: updatedBowler.economy,
          }),
        });
      }

      // Update over
      await fetch(`http://localhost:4000/api/overs/${overId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: runsByOver + 1,
          deliveries: [...currentRunStack, "nb"],
        }),
      });

      // Update local state
      if (inningNo === 2) {
        setRemainingRuns(remainingRuns - 1);
      }
      setTotalRuns(totalRuns + 1);
      setRunsByOver(runsByOver + 1);
      setExtras((state) => ({
        ...state,
        total: state.total + 1,
        noBall: state.noBall + 1,
      }));
      setCurrentRunStack((state) => [...state, "nb"]);
      addNoBallEffect();
    } catch (error) {
      console.error("Error handling no-ball:", error);
      setError(`Error handling no-ball: ${error.message}`);
    }
  };

  const addNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll(".score-types-button");
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.add("score-types-button-noball");
    }
    setNoBall(true);
  };

  const removeNoBallEffect = () => {
    const scoreTypesButtons = document.querySelectorAll(".score-types-button");
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].classList.remove("score-types-button-noball");
    }
    setNoBall(false);
  };

  const handleWide = async () => {
    const overId = await ensureOver();
    if (!overId) return;

    try {
      // Update inning
      await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: totalRuns + 1,
          extras: {
            total: extras.total + 1,
            wide: extras.wide + 1,
            noBall: extras.noBall,
          },
        }),
      });

      // Update bowler
      const index = bowlers.findIndex((blr) => blr.id === bowler.id);
      if (index !== -1) {
        const updatedBowler = {
          ...bowlers[index],
          wides: bowlers[index].wides + 1,
          runs: bowlers[index].runs + 1,
          economy: ((bowlers[index].runs + 1) / bowlers[index].overs) || 0,
        };
        bowlers[index] = updatedBowler;
        await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wides: updatedBowler.wides,
            runs: updatedBowler.runs,
            economy: updatedBowler.economy,
          }),
        });
      }

      // Update over
      await fetch(`http://localhost:4000/api/overs/${overId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: runsByOver + 1,
          deliveries: [...currentRunStack, isNoBall ? "nb" : "wd"],
        }),
      });

      // Update local state
      if (isNoBall) {
        setCurrentRunStack((state) => [...state, "nb"]);
        removeNoBallEffect();
      } else {
        if (inningNo === 2) {
          setRemainingRuns(remainingRuns - 1);
        }
        setCurrentRunStack((state) => [...state, "wd"]);
        setTotalRuns(totalRuns + 1);
        setRunsByOver(runsByOver + 1);
        setExtras((state) => ({
          ...state,
          total: state.total + 1,
          wide: state.wide + 1,
        }));
      }
    } catch (error) {
      console.error("Error handling wide:", error);
      setError(`Error handling wide: ${error.message}`);
    }
  };

  const handleWicket = async (isRunOut, playerId) => {
    const overId = await ensureOver();
    if (!overId) return;

    setRunOutPlayerId("");
    let isOverCompleted = false;

    try {
      // Update inning
      const inningUpdate = {
        wickets: wicketCount + 1,
        balls: isNoBall ? ballCount : ballCount + 1,
        overs: isNoBall ? totalOvers : Math.round((totalOvers + 0.1) * 10) / 10,
      };
      if (isNoBall && !isRunOut) {
        inningUpdate.runs = totalRuns + 1;
        inningUpdate.extras = {
          total: extras.total + 1,
          wide: extras.wide,
          noBall: extras.noBall + 1,
        };
      }
      await fetch(`http://localhost:4000/api/innings/${inningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inningUpdate),
      });

      // Update batter
      let batterToUpdate = batter1.onStrike ? batter1 : batter2;
      if (isRunOut) {
        batterToUpdate = batter1.id === playerId ? batter1 : batter2;
      }
      if (!isNoBall || isRunOut) {
        await fetch(`http://localhost:4000/api/batters/${batterToUpdate.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            balls: isNoBall ? batterToUpdate.balls : batterToUpdate.balls + 1,
            battingStatus: 'out',
            outType: isRunOut ? RUN_OUT : outType,
          }),
        });
      }

      // Update bowler
      if (bowler.id && (!isNoBall || isRunOut)) {
        const index = bowlers.findIndex((blr) => blr.id === bowler.id);
        if (index !== -1) {
          const updatedBowler = {
            ...bowlers[index],
            wickets: bowlers[index].wickets + 1,
            runs: isNoBall ? bowlers[index].runs + 1 : bowlers[index].runs,
            economy: isNoBall
              ? ((bowlers[index].runs + 1) / bowlers[index].overs) || 0
              : (bowlers[index].runs / bowlers[index].overs) || 0,
          };
          bowlers[index] = updatedBowler;
          await fetch(`http://localhost:4000/api/bowlers/${bowler.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              wickets: updatedBowler.wickets,
              runs: updatedBowler.runs,
              economy: updatedBowler.economy,
            }),
          });
        }
      }

      // Update over
      const delivery = isNoBall ? (isRunOut ? "nbW" : "nb") : "W";
      await fetch(`http://localhost:4000/api/overs/${overId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runs: isNoBall && !isRunOut ? runsByOver + 1 : runsByOver,
          deliveries: [...currentRunStack, delivery],
        }),
      });

      // Update local state
      setWicketCount(wicketCount + 1);
      setCurrentRunStack((state) => [...state, delivery]);
      if (!isNoBall) {
        setBallCount(ballCount + 1);
        setTotalOvers(Math.round((totalOvers + 0.1) * 10) / 10);
      } else if (!isRunOut) {
        setTotalRuns(totalRuns + 1);
        setRunsByOver(runsByOver + 1);
        setExtras((state) => ({
          ...state,
          total: state.total + 1,
          noBall: state.noBall + 1,
        }));
      }
      if (isRunOut) {
        if (batter1.id === playerId) {
          await newBatter1();
          changeStrikeRadio("strike");
          await switchBatterStrike("batter1");
        } else {
          await newBatter2();
          changeStrikeRadio("non-strike");
          await switchBatterStrike("batter2");
        }
      } else if (!isNoBall) {
        if (batter1.onStrike) {
          await newBatter1();
        } else {
          await newBatter2();
        }
      }
      disableAllScoreButtons();

      // Handle over completion
      if (ballCount === 5 && !isNoBall) {
        isOverCompleted = true;
        const arr = [...currentRunStack, delivery];
        await overCompleted(isNoBall && !isRunOut ? runsByOver + 1 : runsByOver, arr);
      }

      // Handle end of inning
      if (isNoBall && isRunOut && wicketCount + 1 === 10) {
        const endInningButton = document.getElementById("end-inning");
        endInningButton.disabled = false;
        const bowlerNameElement = document.querySelector(".react-autosuggest__input");
        bowlerNameElement.disabled = true;
        const batter1NameElement = document.getElementById("batter1Name");
        batter1NameElement.disabled = true;
        const batter2NameElement = document.getElementById("batter2Name");
        batter2NameElement.disabled = true;
        setInputBowler("");
      } else if (!isNoBall && (wicketCount + 1 === 10 || (isOverCompleted && overCount + 1 === maxOvers))) {
        const endInningButton = document.getElementById("end-inning");
        endInningButton.disabled = false;
        const bowlerNameElement = document.querySelector(".react-autosuggest__input");
        bowlerNameElement.disabled = true;
        const batter1NameElement = document.getElementById("batter1Name");
        batter1NameElement.disabled = true;
        const batter2NameElement = document.getElementById("batter2Name");
        batter2NameElement.disabled = true;
        setInputBowler("");
      }
      if (isNoBall) removeNoBallEffect();
    } catch (error) {
      console.error("Error handling wicket:", error);
      setError(`Error handling wicket: ${error.message}`);
    }
  };

  const handleEndInning = async () => {
    const endInningButton = document.getElementById("end-inning");
    if (endInningButton.textContent === "Reset") {
      navigate("/");
    } else {
      try {
        // Update current inning
        const updatedBatters = [...batters];
        if (batter1.id) {
          const batter1Exists = updatedBatters.find(b => b.id === batter1.id);
          if (!batter1Exists) {
            updatedBatters.push({
              id: batter1.id,
              playerId: batter1.playerId,
              runs: batter1.runs,
              balls: batter1.balls,
              fours: batter1.fours,
              sixes: batter1.sixes,
              strikeRate: batter1.strikeRate,
              onStrike: batter1.onStrike,
              battingOrder: batter1.battingOrder,
              battingStatus: 'batting',
            });
          }
        }
        if (batter2.id) {
          const batter2Exists = updatedBatters.find(b => b.id === batter2.id);
          if (!batter2Exists) {
            updatedBatters.push({
              id: batter2.id,
              playerId: batter2.playerId,
              runs: batter2.runs,
              balls: batter2.balls,
              fours: batter2.fours,
              sixes: batter2.sixes,
              strikeRate: batter2.strikeRate,
              onStrike: batter2.onStrike,
              battingOrder: batter2.battingOrder,
              battingStatus: 'batting',
            });
          }
        }

        await fetch(`http://localhost:4000/api/innings/${inningId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            runs: totalRuns,
            wickets: wicketCount,
            overs: totalOvers,
            balls: ballCount,
            extras,
            status: "completed",
          }),
        });

        if (inningNo === 1) {
          // Create second inning
          const response = await fetch(`http://localhost:4000/api/matches/${matchId}/innings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              inningNumber: 2,
              battingTeamId: batting === team1 ? team2 : team1,
              bowlingTeamId: batting,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to create second inning");
          }
          const newInning = await response.json();

          // Reset state for second inning
          setInningNo(2);
          setInningId(newInning._id);
          setCurrentRunStack([]);
          setTotalRuns(0);
          setExtras({ total: 0, wide: 0, noBall: 0 });
          setRunsByOver(0);
          setWicketCount(0);
          setTotalOvers(0);
          setBallCount(0);
          setOverCount(0);
          setRecentOvers([]);
          setBatter1({});
          setBatter2({});
          setBatters([]);
          setBowlers([]);
          setBattingOrder(0);
          setInputBowler("");
          setBowler({});
          setCurrentOverId(null);
          setRemainingBalls(maxOvers * 6);
          setRemainingRuns(match.inning1.runs + 1);
          setStrikeValue("strike");
          endInningButton.disabled = true;

          const bowlerNameElement = document.querySelector(".react-autosuggest__input");
          if (bowlerNameElement) bowlerNameElement.disabled = false;
          const batter1NameElement = document.getElementById("batter1Name");
          if (batter1NameElement) {
            batter1NameElement.value = "";
            batter1NameElement.disabled = false;
          }
          const batter2NameElement = document.getElementById("batter2Name");
          if (batter2NameElement) {
            batter2NameElement.value = "";
            batter2NameElement.disabled = false;
          }
        } else {
          // End match
          await fetch(`http://localhost:4000/api/matches/${matchId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "completed",
              result: winningMessage,
            }),
          });
          endInningButton.textContent = "Reset";
          setMatchEnded(true);
          navigate("/match-summary", {
            state: { matchId, team1, team2, result: winningMessage },
          });
        }
      } catch (error) {
        console.error("Error ending inning:", error);
        setError(`Error ending inning: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    if (outType !== "") {
      if (outType === RUN_OUT) {
        if (runOutPlayerId !== "") {
          handleWicket(true, runOutPlayerId);
        }
      } else {
        handleWicket(false, "");
      }
    }
    setModalOpen(false);
    setOutType("");
    setRunOutPlayerId("");
  };

  const handleOutTypeChange = (e) => {
    const outTypeValue = e.target.value;
    setOutType(outTypeValue);
    if (outTypeValue === RUN_OUT) {
      const runOutPlayerElement = document.getElementById("run-out-player");
      runOutPlayerElement.classList.remove("hide");
      const runOutPlayerErrorElement = document.getElementById("run-out-player-error");
      runOutPlayerErrorElement.classList.remove("hide");
    }
  };

  const handleRunOutPlayerChange = (e) => {
    const playerId = e.target.value;
    const runOutPlayerErrorElement = document.getElementById("run-out-player-error");
    runOutPlayerErrorElement.classList.add("hide");
    setRunOutPlayerId(playerId);
  };

  const endMatch = () => {
    disableAllScoreButtons();
    const endInningButton = document.getElementById("end-inning");
    if (endInningButton.textContent === "Score Board") {
      endInningButton.disabled = false;
    }
  };

  const disableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll(".score-types-button");
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = true;
    }
  };

  const enableAllScoreButtons = () => {
    const scoreTypesButtons = document.querySelectorAll(".score-types-button");
    for (let i = 0; i < scoreTypesButtons.length; i++) {
      scoreTypesButtons[i].disabled = false;
    }
  };

  if (batter1.id && batter2.id && bowler.id) {
    enableAllScoreButtons();
  }

  let rrr = (remainingRuns / (remainingBalls / 6)).toFixed(2);
  rrr = isFinite(rrr) ? rrr : 0;
  const overs = overCount + ballCount / 6;
  let crr = (totalRuns / overs).toFixed(2);
  crr = isFinite(crr) ? crr : 0;
  const inning1 = match.inning1;
  const inning2 = match.inning2;
  const scoringTeam = batting === team1 ? team1 : team2;
  const chasingTeam = scoringTeam === team1 ? team2 : team1;
  let winningMessage = `${inningNo === 1 ? scoringTeam : chasingTeam} needs ${remainingRuns} ${
    remainingRuns <= 1 ? "run" : "runs"
  } in ${remainingBalls} ${remainingBalls <= 1 ? "ball" : "balls"} to win`;
  if (inningNo === 2) {
    const target = inning1.runs + 1;
    if (wicketCount < 10 && overCount <= maxOvers && totalRuns >= target) {
      winningMessage = `${chasingTeam} won by ${10 - wicketCount} wickets`;
      endMatch();
    }
    if ((wicketCount >= 10 || overCount >= maxOvers) && totalRuns < target - 1) {
      winningMessage = `${scoringTeam} won by ${target - totalRuns - 1} runs`;
      endMatch();
    }
    if (wicketCount < 10 && overCount === maxOvers && totalRuns === target - 1) {
      winningMessage = "Match Tied";
      endMatch();
    }
  }

  const welcomeContent = (
    <>
      <div></div>
      <div></div>
      <div className="badge-content">
        Welcome to the match between {team1} and {team2}
      </div>
    </>
  );

  const remainingRunsContent = (
    <>
      <div></div>
      <div></div>
      <div className="badge-content">{winningMessage}</div>
      <div>RRR: {rrr}</div>
    </>
  );

  const firstInningCompletedContent = (
    <>
      <div></div>
      <div></div>
      <div className="badge-content">{scoringTeam} completed their inning</div>
    </>
  );

  return (
    <div className="container">
      {error && <div className="text-red-500">{error}</div>}
      <div className="inning">
        <div>
          {team1} vs {team2}, {inningNo === 1 ? "1st" : "2nd"} Inning
        </div>
        <div>
          <button id="end-inning" onClick={handleEndInning}>
            {inningNo === 1 ? "End Inning" : "Score Board"}
          </button>
        </div>
      </div>
      <div id="badge" className="badge badge-flex">
        {inningNo === 2 ? remainingRunsContent : overCount === maxOvers || wicketCount === 10 ? firstInningCompletedContent : welcomeContent}
      </div>
      <div className="score-container">
        <div>
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={RadioGroupBoxstyle}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="wicket"
                  name="row-radio-buttons-group"
                  onChange={handleOutTypeChange}
                  sx={{ alignItems: "center" }}
                >
                  <FormControlLabel
                    value={CATCH}
                    control={<Radio sx={{ "&.Mui-checked": { color: pink[600] } }} />}
                    label={CATCH}
                  />
                  <FormControlLabel
                    value={STUMP}
                    control={<Radio sx={{ "&.Mui-checked": { color: pink[600] } }} />}
                    label={STUMP}
                  />
                  <FormControlLabel
                    value={HIT_WICKET}
                    control={<Radio sx={{ "&.Mui-checked": { color: pink[600] } }} />}
                    label={HIT_WICKET}
                  />
                  <FormControlLabel
                    value={BOLD}
                    control={<Radio sx={{ "&.Mui-checked": { color: pink[600] } }} />}
                    label={BOLD}
                  />
                  <FormControlLabel
                    value={RUN_OUT}
                    control={<Radio sx={{ "&.Mui-checked": { color: pink[600] } }} />}
                    label={RUN_OUT}
                  />
                  <select defaultValue="" id="run-out-player" className="run-out-player hide" onChange={handleRunOutPlayerChange}>
                    <option value="" disabled>
                      select option
                    </option>
                    <option value={batter1.id}>{batter1.playerId}</option>
                    <option value={batter2.id}>{batter2.playerId}</option>
                  </select>
                </RadioGroup>
                <div id="run-out-player-error" className="run-out-player-error hide">
                  Please select run out player name
                </div>
              </FormControl>
            </Box>
          </Modal>
        </div>
        <div className="score">
          <div>
            {inningNo === 1 ? scoringTeam : chasingTeam} : {totalRuns}/{wicketCount} ({totalOvers})
          </div>
          <div>CRR : {isNaN(crr) ? 0 : crr}</div>
        </div>
        <div className="batting-container">
          <table>
            <thead>
              <tr>
                <td className="score-types padding-left">Batting</td>
                <td className="score-types">R(B)</td>
                <td className="score-types text-center">4s</td>
                <td className="score-types text-center">6s</td>
                <td className="score-types text-center">SR</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="score-types">
                  <span id="strike">
                    <Radio
                      size="small"
                      checked={strikeValue === "strike"}
                      onChange={handleStrikeChange}
                      value="strike"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "strike" }}
                      style={{ padding: "0 4px 0 2px" }}
                    />
                  </span>
                  <input type="text" id="batter1Name" className="batter-name" onBlur={handleBatter1Blur} />
                  <IconButton color="primary" className="icon-button" onClick={editBatter1Name}>
                    <EditIcon className="icon-size" />
                  </IconButton>
                </td>
                <td className="score-types">{batter1.runs === undefined ? `0(0)` : `${batter1.runs}(${batter1.balls})`}</td>
                <td className="score-types">{batter1.fours === undefined ? 0 : batter1.fours}</td>
                <td className="score-types">{batter1.sixes === undefined ? 0 : batter1.sixes}</td>
                <td className="score-types">{batter1.strikeRate === undefined ? 0 : batter1.strikeRate.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="score-types">
                  <span id="non-strike">
                    <Radio
                      size="small"
                      checked={strikeValue === "non-strike"}
                      onChange={handleStrikeChange}
                      value="non-strike"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "non-strike" }}
                      style={{ padding: "0 4px 0 2px" }}
                    />
                  </span>
                  <input type="text" id="batter2Name" className="batter-name" onBlur={handleBatter2Blur} />
                  <IconButton color="primary" className="icon-button" onClick={editBatter2Name}>
                    <EditIcon className="icon-size" />
                  </IconButton>
                </td>
                <td className="score-types">{batter2.runs === undefined ? `0(0)` : `${batter2.runs}(${batter2.balls})`}</td>
                <td className="score-types">{batter2.fours === undefined ? 0 : batter2.fours}</td>
                <td className="score-types">{batter2.sixes === undefined ? 0 : batter2.sixes}</td>
                <td className="score-types">{batter2.strikeRate === undefined ? 0 : batter2.strikeRate.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bowler-container">
          <div className="bowler">
            Bowler:
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={(suggestion) => <div>{suggestion.playerId}</div>}
              inputProps={inputProps}
            />
            <IconButton color="primary" className="icon-button" onClick={editBowlerName}>
              <EditIcon className="icon-size" />
            </IconButton>
          </div>
          <div className="bowler-runs">
            {currentRunStack.map((run, i) => (
              <div key={i}>{run}</div>
            ))}
            <IconButton color="warning" className="icon-button" onClick={undoDelivery}>
              <DeleteIcon className="delete-icon-size" />
            </IconButton>
          </div>
        </div>
        <div className="score-types-container">
          <table>
            <tbody>
              <tr>
                <td className="score-types" onClick={() => handleRun(0)}>
                  <button className="score-types-button" disabled>
                    0
                  </button>
                </td>
                <td className="score-types" onClick={() => handleRun(1)}>
                  <button className="score-types-button" disabled>
                    1
                  </button>
                </td>
                <td className="score-types" onClick={() => handleRun(2)}>
                  <button className="score-types-button" disabled>
                    2
                  </button>
                </td>
                <td className="score-types" onClick={handleNoBall}>
                  <button className="score-types-button" disabled>
                    nb
                  </button>
                </td>
                <td rowSpan="2" className="score-types" onClick={() => setModalOpen(true)}>
                  <button className="score-types-button" disabled>
                    W
                  </button>
                </td>
              </tr>
              <tr>
                <td className="score-types" onClick={() => handleRun(3)}>
                  <button className="score-types-button" disabled>
                    3
                  </button>
                </td>
                <td className="score-types" onClick={() => handleRun(4)}>
                  <button className="score-types-button" disabled>
                    4
                  </button>
                </td>
                <td className="score-types" onClick={() => handleRun(6)}>
                  <button className="score-types-button" disabled>
                    6
                  </button>
                </td>
                <td className="score-types" onClick={handleWide}>
                  <button className="score-types-button" disabled>
                    wd
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="extras-container">
          <div>Extras: {extras.total}</div>
          <div>Wd: {extras.wide}</div>
          <div>NB: {extras.noBall}</div>
        </div>
        <div className="recent-over-container">
          <div className="recent-over-text">Recent Overs</div>
          <div className="recent-over-details">
            <table>
              <tbody>
                {recentOvers.map((recentOver, i) => (
                  <tr key={i}>
                    <td>{recentOver.overNo}.</td>
                    <td>{recentOver.bowler}:</td>
                    <td>
                      <div className="recent-over-runs">
                        {recentOver.stack.map((run, index) => (
                          <div key={index}>{run}</div>
                        ))}
                      </div>
                    </td>
                    <td className="recent-over-total-run">
                      <div>{recentOver.runs}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="score-board-container">
          <div className="score-board-text text-center">Score Board</div>
          <div>
            <div className="score-board-innings">
              <div>{scoringTeam} Innings</div>
              <div>RR:{inningNo === 1 ? crr : inning1.runRate || crr}</div>
              <div>
                {inningNo === 1 ? totalRuns : inning1.runs || totalRuns}-{inningNo === 1 ? wicketCount : inning1.wickets || wicketCount} (
                {inningNo === 1 ? totalOvers : inning1.overs || totalOvers} Ov)
              </div>
            </div>
            <div className="sb-batting">
              <table>
                <thead>
                  <tr>
                    <td className="score-types padding-left">Batter</td>
                    <td className="score-types">R(B)</td>
                    <td className="score-types text-center">4s</td>
                    <td className="score-types text-center">6s</td>
                    <td className="score-types text-center">SR</td>
                  </tr>
                </thead>
                <tbody>
                  {batters.map((batter, i) => (
                    <tr key={i}>
                      <td className="score-types padding-left">{batter.playerId}</td>
                      <td className="score-types">
                        {batter.runs}({batter.balls})
                      </td>
                      <td className="score-types text-center">{batter.fours}</td>
                      <td className="score-types text-center">{batter.sixes}</td>
                      <td className="score-types text-center">{batter.strikeRate.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="score-types padding-left">Extras:</td>
                    <td className="score-types">{inningNo === 1 ? extras.total : inning1.extra?.total || extras.total}</td>
                    <td className="score-types text-center">wd:{inningNo === 1 ? extras.wide : inning1.extra?.wide || extras.wide}</td>
                    <td className="score-types text-center">nb:{inningNo === 1 ? extras.noBall : inning1.extra?.noBall || extras.noBall}</td>
                    <td className="score-types text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="sb-bowling">
              <table>
                <thead>
                  <tr>
                    <td className="score-types padding-left">Bowler</td>
                    <td className="score-types">O</td>
                    <td className="score-types text-center">M</td>
                    <td className="score-types text-center">R</td>
                    <td className="score-types text-center">W</td>
                    <td className="score-types text-center">NB</td>
                    <td className="score-types text-center">WD</td>
                    <td className="score-types text-center">ECO</td>
                  </tr>
                </thead>
                <tbody>
                  {bowlers.map((blr, i) => (
                    <tr key={i}>
                      <td className="score-types padding-left">{blr.playerId}</td>
                      <td className="score-types">{blr.overs}</td>
                      <td className="score-types text-center">{blr.maidens}</td>
                      <td className="score-types text-center">{blr.runs}</td>
                      <td className="score-types text-center">{blr.wickets}</td>
                      <td className="score-types text-center">{blr.noBalls}</td>
                      <td className="score-types text-center">{blr.wides}</td>
                      <td className="score-types text-center">{blr.economy.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {inningNo === 2 && (
            <div>
              <div className="score-board-innings">
                <div>{chasingTeam} Innings</div>
                <div>RR:{inningNo === 2 ? crr : inning2.runRate || crr}</div>
                <div>
                  {hasMatchEnded ? inning2.runs || totalRuns : totalRuns}-{hasMatchEnded ? inning2.wickets || wicketCount : wicketCount} (
                  {hasMatchEnded ? inning2.overs || totalOvers : totalOvers} Ov)
                </div>
              </div>
              <div className="sb-batting">
                <table>
                  <thead>
                    <tr>
                      <td className="score-types padding-left">Batter</td>
                      <td className="score-types">R(B)</td>
                      <td className="score-types text-center">4s</td>
                      <td className="score-types text-center">6s</td>
                      <td className="score-types text-center">SR</td>
                    </tr>
                  </thead>
                  <tbody>
                    {batters.map((batter, i) => (
                      <tr key={i}>
                        <td className="score-types padding-left">{batter.playerId}</td>
                        <td className="score-types">
                          {batter.runs}({batter.balls})
                        </td>
                        <td className="score-types text-center">{batter.fours}</td>
                        <td className="score-types text-center">{batter.sixes}</td>
                        <td className="score-types text-center">{batter.strikeRate.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="score-types padding-left">Extras:</td>
                      <td className="score-types">{hasMatchEnded ? inning2.extra?.total || extras.total : extras.total}</td>
                      <td className="score-types text-center">wd:{hasMatchEnded ? inning2.extra?.wide || extras.wide : extras.wide}</td>
                      <td className="score-types text-center">nb:{hasMatchEnded ? inning2.extra?.noBall || extras.noBall : extras.noBall}</td>
                      <td className="score-types text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sb-bowling">
                <table>
                  <thead>
                    <tr>
                      <td className="score-types padding-left">Bowler</td>
                      <td className="score-types">O</td>
                      <td className="score-types text-center">M</td>
                      <td className="score-types text-center">R</td>
                      <td className="score-types text-center">W</td>
                      <td className="score-types text-center">NB</td>
                      <td className="score-types text-center">WD</td>
                      <td className="score-types text-center">ECO</td>
                    </tr>
                  </thead>
                  <tbody>
                    {bowlers.map((blr, i) => (
                      <tr key={i}>
                        <td className="score-types padding-left">{blr.playerId}</td>
                        <td className="score-types">{blr.overs}</td>
                        <td className="score-types text-center">{blr.maidens}</td>
                        <td className="score-types text-center">{blr.runs}</td>
                        <td className="score-types text-center">{blr.wickets}</td>
                        <td className="score-types text-center">{blr.noBalls}</td>
                        <td className="score-types text-center">{blr.wides}</td>
                        <td className="score-types text-center">{blr.economy.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

