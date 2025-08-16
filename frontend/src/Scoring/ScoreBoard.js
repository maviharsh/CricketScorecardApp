import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMatch } from "../context/MatchContext";
import {
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import axios from "axios";

// --- HELPER COMPONENT: BattingTable ---
const BattingTable = ({ batters }) => {
  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left font-semibold text-sm">Batter</th>
            <th className="p-2 text-right font-semibold text-sm">R</th>
            <th className="p-2 text-right font-semibold text-sm">B</th>
            <th className="p-2 text-right font-semibold text-sm">4s</th>
            <th className="p-2 text-right font-semibold text-sm">6s</th>
            <th className="p-2 text-right font-semibold text-sm">SR</th>
          </tr>
        </thead>
        <tbody>
          {(batters || []).map((batter, index) => (
            <tr
              key={batter._id || index}
              className={`border-b ${
                batter.onStrike ? "bg-blue-50" : "bg-white"
              }`}
            >
              <td className="p-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold"
                >
                  {batter.playerName}
                  {batter.onStrike ? "*" : ""}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="text-xs capitalize"
                >
                  {batter.isOut
                    ? (batter.outDetails?.type || "out").replace("_", " ")
                    : "not out"}
                </Typography>
              </td>
              <td className="p-2 text-right font-bold">{batter.runs}</td>
              <td className="p-2 text-right">{batter.ballsFaced}</td>
              <td className="p-2 text-right">{batter.fours}</td>
              <td className="p-2 text-right">{batter.sixes}</td>
              <td className="p-2 text-right">{batter.strikeRate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

// --- HELPER COMPONENT: BowlingTable ---
const BowlingTable = ({ bowlers }) => {
  const formatOvers = (balls) => {
    if (balls === undefined) return "0.0";
    return `${Math.floor(balls / 6)}.${balls % 6}`;
  };

  return (
    <Card className="h-full w-full overflow-auto">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left font-semibold text-sm">Bowler</th>
            <th className="p-2 text-right font-semibold text-sm">O</th>
            <th className="p-2 text-right font-semibold text-sm">M</th>
            <th className="p-2 text-right font-semibold text-sm">R</th>
            <th className="p-2 text-right font-semibold text-sm">W</th>
            <th className="p-2 text-right font-semibold text-sm">Econ</th>
          </tr>
        </thead>
        <tbody>
          {(bowlers || []).map((bowler, index) => (
            <tr key={bowler._id || index} className="border-b bg-white">
              <td className="p-2 font-bold">{bowler.playerName}</td>
              <td className="p-2 text-right">
                {formatOvers(bowler.ballsBowled)}
              </td>
              <td className="p-2 text-right">{bowler.maidens}</td>
              <td className="p-2 text-right">{bowler.runsConceded}</td>
              <td className="p-2 text-right font-bold">{bowler.wickets}</td>
              <td className="p-2 text-right">{bowler.economy.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

// --- HELPER COMPONENT: NewPlayerModal ---
const NewPlayerModal = ({
  open,
  title,
  players,
  onConfirm,
  onCancel,
  disabled = false,
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState("");

  const handleConfirm = () => {
    if (selectedPlayerId) {
      onConfirm(selectedPlayerId);
      setSelectedPlayerId("");
    }
  };

  return (
    <Dialog open={open} handler={onCancel}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody divider>
        <Select
          label="Select Player"
          onChange={(val) => setSelectedPlayerId(val)}
          value={selectedPlayerId}
        >
          {(players || []).map((p) => (
            <Option key={p._id} value={p._id}>
              {p.name}
            </Option>
          ))}
        </Select>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleConfirm}
          disabled={!selectedPlayerId || disabled}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

// --- HELPER COMPONENT: WicketModal ---
const WicketModal = ({ open, handleOpen, onConfirm, currentBatters }) => {
  const [wicketType, setWicketType] = useState("bold");
  const [runOutPlayerId, setRunOutPlayerId] = useState("");

  const handleConfirm = () => {
    if (wicketType === "run_out" && !runOutPlayerId) {
      alert("Please select which batter was run out.");
      return;
    }
    onConfirm({
      type: wicketType,
      outPlayerId: wicketType === "run_out" ? runOutPlayerId : null,
    });
    setWicketType("bold");
    setRunOutPlayerId("");
    handleOpen();
  };

  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Wicket Details</DialogHeader>
      <DialogBody divider className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {["bold", "catch", "stump", "lbw", "hit_wicket", "run_out"].map(
            (type) => (
              <div key={type}>
                <Radio
                  id={type}
                  name="wicketType"
                  label={type.replace("_", " ").toUpperCase()}
                  value={type}
                  checked={wicketType === type}
                  onChange={(e) => setWicketType(e.target.value)}
                />
              </div>
            )
          )}
        </div>
        {wicketType === "run_out" && (
          <Select
            label="Who was out?"
            onChange={(val) => setRunOutPlayerId(val)}
          >
            {(currentBatters || [])
              .filter((b) => b)
              .map((b) => (
                <Option key={b.playerId} value={b.playerId}>
                  {b.playerName}
                </Option>
              ))}
          </Select>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleConfirm}>
          <span>Confirm Wicket</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

const InningSetupForm = ({ matchData, onSetupComplete }) => {
  const [strikerId, setStrikerId] = useState("");
  const [nonStrikerId, setNonStrikerId] = useState("");
  const [bowlerId, setBowlerId] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Get the setMatchData function from the context to update the state
  const { setMatchData } = useMatch();

  const currentInning = matchData.innings[matchData.innings.length - 1];
  const battingTeam = [matchData.team1Id, matchData.team2Id].find(
    (team) => team._id === currentInning.battingTeamId._id
  );
  const bowlingTeam = [matchData.team1Id, matchData.team2Id].find(
    (team) => team._id === currentInning.bowlingTeamId._id
  );

  const availableBatters = battingTeam ? battingTeam.players : [];
  const availableBowlers = bowlingTeam ? bowlingTeam.players : [];

  const handleStartInning = async () => {
    if (!strikerId || !nonStrikerId || !bowlerId)
      return alert("Please select striker, non-striker, and bowler.");
    if (strikerId === nonStrikerId)
      return alert("Striker and Non-Striker cannot be the same person.");

    setLoading(true);

    // --- REPLACE YOUR EXISTING TRY/CATCH/FINALLY WITH THIS ---
    try {
      console.log("1. Awaiting API call to setup inning...");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/innings/${currentInning._id}/setup`,
        { strikerId, nonStrikerId, bowlerId },
        { withCredentials: true }
      );
      console.log(
        "2. API call successful. Response data received:",
        response.data
      );

      console.log("3. About to call setMatchData to update the state.");
      setMatchData(response.data);
      console.log(
        "4. setMatchData call finished. The component should now re-render."
      );
    } catch (error) {
      console.error(
        "💥 CATCH BLOCK TRIGGERED! The error happened at some point before this."
      );
      console.error("Full error object:", error); // This will log the raw error
      alert(
        "Failed to start inning. Please check the browser console for new logs."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!battingTeam || !bowlingTeam) return <div>Loading team data...</div>;

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardBody className="flex flex-col gap-6 p-6">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Start Inning {currentInning.inningNumber}
        </Typography>
        <Select label="Select Striker" onChange={(val) => setStrikerId(val)}>
          {availableBatters
            .filter((p) => p._id !== nonStrikerId)
            .map((p) => (
              <Option key={p._id} value={p._id}>
                {p.name}
              </Option>
            ))}
        </Select>
        <Select
          label="Select Non-Striker"
          onChange={(val) => setNonStrikerId(val)}
        >
          {availableBatters
            .filter((p) => p._id !== strikerId)
            .map((p) => (
              <Option key={p._id} value={p._id}>
                {p.name}
              </Option>
            ))}
        </Select>
        <Select
          label="Select Opening Bowler"
          onChange={(val) => setBowlerId(val)}
        >
          {availableBowlers.map((p) => (
            <Option key={p._id} value={p._id}>
              {p.name}
            </Option>
          ))}
        </Select>
        <Button onClick={handleStartInning} disabled={loading} fullWidth>
          {loading ? "Starting..." : "Start Scoring"}
        </Button>
      </CardBody>
    </Card>
  );
};

// --- HELPER COMPONENT: InningCompletionScreen ---
const InningCompletionScreen = ({
  matchData,
  startSecondInning,
  completeMatch,
}) => {
  const navigate = useNavigate();
  const firstInning = matchData.innings[0];
  const secondInning =
    matchData.innings.length > 1 ? matchData.innings[1] : null;
  const target = firstInning.runs + 1;

  const firstInningBattingTeam = [matchData.team1Id, matchData.team2Id].find(
    (t) => t._id === firstInning.battingTeamId._id
  );
  const secondInningBattingTeam = [matchData.team1Id, matchData.team2Id].find(
    (t) => t._id === firstInning.bowlingTeamId._id
  );

  const handleCompleteMatch = useCallback(() => {
    if (matchData.status === "completed" || !secondInning) return;

    let resultText = "";
    let winnerId = null;

    if (secondInning.runs >= target) {
      const wicketsLeft = 10 - secondInning.wickets;
      winnerId = secondInning.battingTeamId._id;
      resultText = `${secondInningBattingTeam.teamname} won by ${wicketsLeft} wicket(s)`;
    } else if (secondInning.runs === target - 1) {
      resultText = "Match Tied";
    } else {
      const runsMargin = target - 1 - secondInning.runs;
      winnerId = firstInning.battingTeamId._id;
      resultText = `${firstInningBattingTeam.teamname} won by ${runsMargin} run(s)`;
    }
    completeMatch(matchData._id, resultText, winnerId);
  }, [
    matchData,
    secondInning,
    target,
    completeMatch,
    firstInningBattingTeam,
    secondInningBattingTeam,
  ]);

  if (matchData.innings.length === 1) {
    return (
      <div className="text-center p-6 bg-blue-gray-50 rounded-lg shadow-md">
        <Typography variant="h5">End of Inning 1</Typography>
        <Typography className="my-2">
          {firstInningBattingTeam.teamname} scored {firstInning.runs}/
          {firstInning.wickets}.
        </Typography>
        <Typography variant="h6" className="my-4">
          Target for {secondInningBattingTeam.teamname} is{" "}
          <strong>{target}</strong> runs.
        </Typography>
        <Button color="blue" onClick={() => startSecondInning(matchData._id)}>
          Start Second Inning
        </Button>
      </div>
    );
  }

  if (matchData.status !== "completed") {
    handleCompleteMatch();
    return <div className="text-center p-6">Calculating final result...</div>;
  }

  return (
    <div className="text-center p-6 bg-green-50 rounded-lg shadow-md">
      <Typography variant="h4">Match Finished</Typography>
      <Typography variant="h5" color="green" className="my-4">
        {matchData.result}
      </Typography>
      <Button color="blue" onClick={() => navigate("/mycricket")}>
        Back to MyCricket Home
      </Button>
    </div>
  );
};

// --- MAIN SCOREBOARD COMPONENT ---
export default function ScoreBoard() {
  const { matchId } = useParams();
  const {
    matchData,
    loading,
    error,
    fetchMatch,
    recordDelivery,
    undoLastDelivery,
    selectNewBatter,
    selectNewBowler,
    startSecondInning,
    completeMatch,
  } = useMatch();

  const [isWicketModalOpen, setIsWicketModalOpen] = useState(false);
  const [isNewBatterModalOpen, setIsNewBatterModalOpen] = useState(false);
  const [isNewBowlerModalOpen, setIsNewBowlerModalOpen] = useState(false);
  const [outBatterForModal, setOutBatterForModal] = useState(null);

  const currentInning = useMemo(
    () => matchData?.innings?.[matchData.innings.length - 1],
    [matchData]
  );
  
  const onStrikeBatter = useMemo(
  // If currentInning.batters is undefined, use an empty array as a fallback.
  () => (currentInning?.batters || []).find((b) => b.onStrike && !b.isOut),
  [currentInning]
);
const nonStrikeBatter = useMemo(
  // Do the same for the non-striker.
  () => (currentInning?.batters || []).find((b) => !b.onStrike && !b.isOut),
  [currentInning]
);

  // ✅ CORRECTION: This logic now correctly finds the active bowler's performance record.
  const currentBowlerPerf = useMemo(() => {
    if (
      !currentInning ||
      !currentInning.oversList ||
      currentInning.oversList.length === 0
    ) {
      return null;
    }
    const lastOver =
      currentInning.oversList[currentInning.oversList.length - 1];
    if (!lastOver) return null;

    // Find the bowler in the inning's bowler performance list whose playerId matches the bowlerId of the last over.
    return currentInning.bowlers.find((b) => b.playerId === lastOver.bowlerId);
  }, [currentInning]);

const battingTeam = useMemo(
  () =>
    [matchData?.team1Id, matchData?.team2Id].find(
      // Add ?. before the final _id to prevent the crash
      (t) => t?._id === currentInning?.battingTeamId?._id
    ),
  [matchData, currentInning]
);

const bowlingTeam = useMemo(
  () =>
    [matchData?.team1Id, matchData?.team2Id].find(
      // Add ?. before the final _id to prevent the crash
      (t) => t?._id === currentInning?.bowlingTeamId?._id
    ),
  [matchData, currentInning]
);

  const availableBatters = useMemo(
    () =>
      (battingTeam?.players || []).filter(
      (p) => !(currentInning?.batters || []).some((b) => b.playerId === p._id)
    ),
     [battingTeam, currentInning]
  );
  const availableBowlers = useMemo(
    () =>
      bowlingTeam?.players.filter(
        (p) => p._id !== currentBowlerPerf?.playerId
      ) || [],
    [bowlingTeam, currentBowlerPerf]
  );

  const legalBallsInOver = useMemo(
    () => (currentInning ? currentInning.balls % 6 : 0),
    [currentInning]
  );

  const isSetupComplete = useMemo(
    () => currentInning?.batters.length >= 2,
    [currentInning]
  );
  const isOverFinished = useMemo(() => {
    // Return false if we don't have the necessary data yet.
    if (!currentInning || !currentInning.oversList || currentInning.oversList.length === 0) {
        return false;
    }

    // Get the very last over, which is the one currently in progress.
    const lastOver = currentInning.oversList[currentInning.oversList.length - 1];

    // If the last over data is incomplete, return false.
    if (!lastOver || !lastOver.deliveries) {
        return false;
    }

    // Count the number of legal (not wide or no-ball) deliveries in THIS over.
    const legalBallsInThisOver = lastOver.deliveries.filter(d => !d.isWide && !d.isNoBall).length;

    // The over is finished only if exactly 6 legal balls have been bowled in it.
    return legalBallsInThisOver === 6;
}, [currentInning]);

  const isInningFinished = useMemo(() => {
    if (!currentInning || !matchData) return false;
    const allOut = currentInning.wickets === 10;
    const oversDone = currentInning.overs >= matchData.maxOvers;
    if (currentInning.inningNumber === 2) {
      const target = matchData.innings[0].runs + 1;
      if (currentInning.runs >= target) return true;
    }
    return allOut || oversDone;
  }, [currentInning, matchData]);

  useEffect(() => {
    if (matchId) {
      fetchMatch(matchId);
    }
  }, [matchId, fetchMatch]);

  useEffect(() => {
    if (outBatterForModal && !isInningFinished) {
      setIsNewBatterModalOpen(true);
    }
  }, [outBatterForModal, isInningFinished]);

  const handleRecordDelivery = (payload) => {
    if (!onStrikeBatter || !nonStrikeBatter || !currentBowlerPerf) {
      alert("Error: Active players not found. Please refresh.");
      return;
    }
    const fullPayload = {
      matchId,
      inningId: currentInning._id,
      batterId: onStrikeBatter.playerId,
      nonStrikerId: nonStrikeBatter.playerId,
      bowlerId: currentBowlerPerf.playerId,
      ...payload,
    };
    recordDelivery(fullPayload);

    if (payload.isWicket) {
      const outPlayerId =
        payload.wicketDetails.type === "run_out"
          ? payload.wicketDetails.outPlayerId
          : onStrikeBatter.playerId;
      setOutBatterForModal(outPlayerId);
    }
  };

  const handleWicketConfirm = (wicketDetails) => {
    handleRecordDelivery({
      isWicket: true,
      runs: 0,
      isWide: false,
      isNoBall: false,
      wicketDetails,
    });
  };

  const handleSelectNewBatter = (newBatterId) => {
    selectNewBatter(currentInning._id, newBatterId, outBatterForModal);
    setIsNewBatterModalOpen(false);
    setOutBatterForModal(null);
  };

  const handleSelectNewBowler = (newBowlerId) => {
    selectNewBowler(currentInning._id, newBowlerId);
    setIsNewBowlerModalOpen(false);
  };

  if (loading && !matchData)
    return <div className="p-4 text-center text-lg">Loading Match...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (!matchData)
    return <div className="p-4 text-center">Match data not found.</div>;
  if (!isSetupComplete)
    return (
      <InningSetupForm
        matchData={matchData}
        onSetupComplete={() => fetchMatch(matchId)}
      />
    );

  if (
    !onStrikeBatter ||
    !nonStrikeBatter ||
    !currentBowlerPerf ||
    !battingTeam ||
    !bowlingTeam
  ) {
    return (
      <div className="p-4 text-center text-lg">Initializing Scoreboard...</div>
    );
  }

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      <WicketModal
        open={isWicketModalOpen}
        handleOpen={() => setIsWicketModalOpen(false)}
        onConfirm={handleWicketConfirm}
        currentBatters={[onStrikeBatter, nonStrikeBatter]}
      />
      <NewPlayerModal
        open={isNewBatterModalOpen}
        title="Select Next Batter"
        players={availableBatters}
        onConfirm={handleSelectNewBatter}
        onCancel={() => setIsNewBatterModalOpen(false)}
      />
      <NewPlayerModal
        open={isNewBowlerModalOpen}
        title="Select Next Bowler"
        players={availableBowlers}
        onConfirm={handleSelectNewBowler}
        onCancel={() => setIsNewBowlerModalOpen(false)}
      />

      {isInningFinished ? (
        <InningCompletionScreen
          matchData={matchData}
          startSecondInning={startSecondInning}
          completeMatch={completeMatch}
        />
      ) : (
        <>
          <div className="text-center mb-4">
            {/* I see you are already using optional chaining here, which is great! */}
            <Typography variant="h4">
              {battingTeam?.teamname} vs {bowlingTeam?.teamname}
            </Typography>
            {matchData.innings.length > 1 && (
              <Typography color="red" variant="h6">
                Target: {matchData.innings[0].runs + 1}
              </Typography>
            )}
          </div>

          <Card className="mb-4">
            <CardBody className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
              <Typography variant="h5" className="sm:h4">
                {battingTeam.teamname}
              </Typography>
              {/* It's safer to add optional chaining to currentInning too */}
              <Typography variant="h2" color="blue-gray">
                {currentInning?.runs}/{currentInning?.wickets}
              </Typography>
              <Typography variant="h6">
                Overs: {`${currentInning?.overs}.${legalBallsInOver}`}
              </Typography>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <BattingTable batters={currentInning.batters} />
            <BowlingTable bowlers={currentInning.bowlers} />
          </div>

          <Card>
            <CardBody>
              <div className="flex items-center justify-end gap-2 mb-4">
                <Button
                  color="red"
                  size="sm"
                  onClick={() => undoLastDelivery(currentInning._id)}
                >
                  Undo
                </Button>
              </div>

              {isOverFinished && currentInning.overs < matchData.maxOvers ? (
                <div className="text-center">
                  <Button
                    color="blue"
                    onClick={() => setIsNewBowlerModalOpen(true)}
                  >
                    Start Next Over
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
                  {[0, 1, 2, 3, 4, 6].map((run) => (
                    <Button
                      key={run}
                      onClick={() =>
                        handleRecordDelivery({
                          runs: run,
                          isWicket: false,
                          isWide: false,
                          isNoBall: false,
                        })
                      }
                    >
                      {run}
                    </Button>
                  ))}
                  <Button
                    color="amber"
                    onClick={() =>
                      handleRecordDelivery({
                        runs: 0,
                        isWicket: false,
                        isWide: true,
                        isNoBall: false,
                      })
                    }
                  >
                    Wide
                  </Button>
                  <Button
                    color="orange"
                    onClick={() =>
                      handleRecordDelivery({
                        runs: 0,
                        isWicket: false,
                        isWide: false,
                        isNoBall: true,
                      })
                    }
                  >
                    No Ball
                  </Button>
                  <Button
                    color="red"
                    onClick={() => setIsWicketModalOpen(true)}
                  >
                    Wicket
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
