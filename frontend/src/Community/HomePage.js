import Buttons from "./Buttons";

export default function HomePage() {
  return (
    <>

      <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-evenly gap-32">
      <Buttons source={"scorecard-svgrepo-com.svg"} tex={"Scorers"}/>
      <Buttons source={"manager-boss-svgrepo-com.svg"} tex={"Coaches"}/>
      <Buttons source={"commentator-svgrepo-com.svg"} tex={"Commentators"}/>
      <Buttons source={"cricket-ground-cricket-svgrepo-com.svg"} tex={"Grounds"}/>
      <Buttons source={"stream-svgrepo-com.svg"} tex={"Streamers"}/>
      <Buttons source={"orange-tshirt-svgrepo-com.svg"} tex={"T-Shirts"}/>
      <Buttons source={"referee-svgrepo-com.svg"} tex={"Umpires"}/>
      <Buttons source={"shops-shop-svgrepo-com.svg"} tex={"Shops"}/>
     
      </div>
    </>
  );
}
