import Buttons from "./Buttons";

export default function HomePage() {
  return (
    <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
        <Buttons source={"team-group-svgrepo-com.svg"} tex={"Teams For My Tournament"} />
        <Buttons source={"trophy-svgrepo-com (1).svg"} tex={"A Tournament To Participate"} />
        <Buttons source={"vs-button-svgrepo-com.svg"} tex={"An Opponent To Play A Match"} />
        <Buttons source={"network-teamwork-svgrepo-com.svg"} tex={"A Team To Join As A Player"} />
        <Buttons source={"man-red-hair-svgrepo-com.svg"} tex={"A Player To Join My Team"} />
        <Buttons source={"cricket-ground-cricket-svgrepo-com.svg"} tex={"A Ground To Play"} />
        <Buttons source={"person-blond-hair-svgrepo-com.svg"} tex={"An Umpire To Hire"} />
        <Buttons source={"score-svgrepo-com.svg"} tex={"A Scorer To Hire"} />

    </div>
  );
}
