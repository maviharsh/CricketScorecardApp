import SidebarWithBurgerMenu from "./Sidebar";
import SearchBox from "./SearchBox";

export default function Header() {
  return (
    <div className="relative isolate bg-gray-900 py-3 sm:py-3">
      <div className="mx-auto max-w-8xl px-7 lg:px-8">
        <div className="mx-auto mt-4 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-6 sm:flex justify-between items-center md:flex lg:flex justify-between items-center gap-x-6 text-white">
            <SidebarWithBurgerMenu />
            <SearchBox />
            <a href="www.google.com" className="flex items-center">
              <img
                src="message-svgrepo-com.svg"
                className="w-10"
                alt="Message Icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
