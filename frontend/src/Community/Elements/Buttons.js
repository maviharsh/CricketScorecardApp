import { Link } from "react-router-dom";

export default function Buttons({source,tex,link}) {
  return (
    <>
      <Link to={link}>
        <button
          className="h-44 w-44 rounded-md bg-gray-900 p-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <div className="flex flex-col items-center gap-2">
          <img src={source} alt="imagica" className="w-28"></img>
          <p className="font-mono  text-2xl">{tex}</p>
          </div>
        </button>
      </Link>
    </>
  );
}
