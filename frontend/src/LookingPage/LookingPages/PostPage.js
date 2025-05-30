import Buttons from "../Elements/Buttons";

export default function PostPage() {
  return (
    <div className="mt-4 mx-4 px-5 pt-5 flex flex-wrap justify-evenly gap-32">
        <Buttons source={"team-group-svgrepo-com.svg"} tex={"Teams For My Tournament"} path={"/teamsfortournamentform"}/>
        <Buttons source={"trophy-svgrepo-com (1).svg"} tex={"A Tournament To Participate"} path={"/tournamenttoparticipateform"}/>
        <Buttons source={"vs-button-svgrepo-com.svg"} tex={"An Opponent To Play A Match"} path={"/opponentform"}/>
        <Buttons source={"network-teamwork-svgrepo-com.svg"} tex={"A Team To Join As A Player"} path={"/teamforplayerform"}/>
        <Buttons source={"man-red-hair-svgrepo-com.svg"} tex={"A Player To Join My Team"} path={"/playerforteamform"}/>
        <Buttons source={"cricket-ground-cricket-svgrepo-com.svg"} tex={"A Ground To Play"} path={"/lookinggroundform"} />
        <Buttons source={"person-blond-hair-svgrepo-com.svg"} tex={"An Umpire To Hire"} path={"/lookingumpireform"}/>
        <Buttons source={"score-svgrepo-com.svg"} tex={"A Scorer To Hire"} path={"/lookingscorerform"} />
    </div>
  );
}
