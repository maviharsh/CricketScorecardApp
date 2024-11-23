import { Typography } from "@material-tailwind/react";
 
export default function Footer() {
  return (
    <footer className="foot flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 p-6 text-center md:justify-between">
      <ul className="flex justify-between flex-wrap items-center gap-y-2 gap-x-8 w-full">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <img src="house-solid.svg" className="w-10" alt="ima"></img>
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <img src="eye-solid.svg" className="w-10" alt="ima"></img>
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <img src="cricket-game-svgrepo-com.svg" className="w-10" alt="ima"></img>
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <img src="community-svgrepo-com.svg" className="w-10" alt="ima"></img>
          </Typography>
        </li>
      </ul>
    </footer>
  );
}