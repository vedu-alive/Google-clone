import { CogIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { MicrophoneIcon, ViewGridIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";

function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) return;

    router.push(`/search?term=${term}`);
  };

  return (
    <header className=" sticky top-0 bg-white ">
      <div className="flex w-full p-6 items-center">
        <Image
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="GoogleImage"
          height={40}
          width={120}
          onClick={() => router.push("/")}
          className="cursor-pointer"
        />
        <form className="flex border border-gray-200 rounded-full shadow-lg max-w-3xl items-center px-6 py-3 ml-10 mr-5 flex-grow">
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow w-full focus:outline-none"
            defaultValue={router.query.term}
          />
          <XIcon
            onClick={() => (searchInputRef.current.value = "")}
            className="h-5 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-110"
          />
          <MicrophoneIcon className="h-5 text-blue-500 mr-3 sm:inline-flex border-l-2 hidden pl-4 border-gray-300" />
          <SearchIcon
            onClick={search}
            className="h-5 hidden sm:inline-flex text-blue-500 cursor-pointer"
          />
          <button hidden="true" type="submit" onClick={search}>
            Search
          </button>
        </form>
        <div className="ml-auto space-x-2 flex">
          <CogIcon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer hidden sm:inline-flex " />
          <ViewGridIcon className=" h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer hidden sm:inline-flex" />
            {/* <Avatar url="https://media-exp1.licdn.com/dms/image/C4D03AQH34EFzopClig/profile-displayphoto-shrink_800_800/0/1642782924048?e=1666828800&v=beta&t=dKXOjVNAcvJcPAu25MagIn7k3YFusb__rInl5rAY6pU" /> */}
        </div>
      </div>
      <HeaderOptions />
    </header>
  );
}

export default Header;
