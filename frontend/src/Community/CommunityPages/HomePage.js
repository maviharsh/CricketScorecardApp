import Buttons from "../Elements/Buttons";

export default function HomePage() {
  return (
    <>

      <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
      <Buttons source={"scorecard-svgrepo-com.svg"} tex={"Scorers"} link={"/scorerpage"}/>
      <Buttons source={"manager-boss-svgrepo-com.svg"} tex={"Coaches"} link={"/coachpage"}/>
      <Buttons source={"commentator-svgrepo-com.svg"} tex={"Commentators"} link={"/commentatorpage"}/>
      <Buttons source={"cricket-ground-cricket-svgrepo-com.svg"} tex={"Grounds"} link={"/groundpage"}/>
      <Buttons source={"stream-svgrepo-com.svg"} tex={"Streamers"} link={"/streamerpage"}/>
      <Buttons source={"orange-tshirt-svgrepo-com.svg"} tex={"T-Shirts"} link={"/tshirtpage"}/>
      <Buttons source={"referee-svgrepo-com.svg"} tex={"Umpires"} link={"/umpirepage"}/>
      <Buttons source={"shops-shop-svgrepo-com.svg"} tex={"Shops"} link={"/shoppage"}/>
     
      </div>
    </>
  );
}
