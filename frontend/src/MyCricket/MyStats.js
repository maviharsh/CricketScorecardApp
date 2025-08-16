import Carding from "../Community/Elements/Card";
import StatsCard from "./StatsCard";

export default function MyStats()
{
    return(
        <div className="mt-4 mx-4 px-5 pt-5 flex  flex-wrap justify-center gap-16">
           <Carding />
           <StatsCard />
        </div>
    )
}
