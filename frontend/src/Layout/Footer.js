import { Link } from "react-router-dom";
 
export default function Footer() {
  return (
    <div className="p-5 m-5">
    <footer className="bg-gray-900 foot flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 p-6 text-center md:justify-between ">
      <ul className="flex justify-between flex-wrap items-center gap-y-2 gap-x-8 w-full">
        <li>
          <Link to='/'>
            <img src="house-solid.svg" className="w-7" alt="ima"></img>
          </Link>
        </li>
        <li>
          <Link to='/looking'>
            <img src="eye-solid.svg" className="w-7" alt="ima"></img>
          </Link>
        </li>
        <li>
          <Link to='/mycricket'>
            <img src="cricket-game-svgrepo-com.svg" className="w-7" alt="ima"></img>
            </Link>
        </li>
        <li>
          <Link to='/community'>
            <img src="community-svgrepo-com.svg" className="w-7" alt="ima"></img>
            </Link>
        </li>
      </ul>
    </footer>
    </div>
  );
}