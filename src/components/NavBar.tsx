import { IoMdSettings } from "react-icons/io";
import logo from "../assets/logo.jpg";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

interface NavBarProps {
  setIsSettingsOpen: (value: boolean) => void;
  iconsSize: number;
  isLoading: boolean;
}

const NavBar = ({ setIsSettingsOpen, iconsSize, isLoading }: NavBarProps) => {
  const [host] = useState(window.location.origin);

  if (isLoading) return null;

  return (
    <nav className="absolute bottom-1 z-20 flex w-full items-center justify-center gap-x-20 lg:bottom-full lg:translate-y-full">
      <a
        className="flex cursor-pointer items-center justify-center rounded-lg bg-transparent p-0 text-gray-600 hover:scale-110 hover:text-palette-accent-hover"
        href={import.meta.env.VITE_GITHUB_URL as string}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={iconsSize} />
      </a>

      <a
        className="flex cursor-pointer items-center justify-center bg-transparent"
        href={host}
      >
        <img
          style={{ width: iconsSize, height: iconsSize }}
          className="rounded-lg object-cover transition-all ease-in-out hover:scale-110"
          src={logo}
          alt="logo"
        />
      </a>

      <button
        className={`flex cursor-pointer items-center justify-center bg-transparent p-0 text-gray-600 transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-180 hover:text-palette-accent-hover hover:duration-700`}
        onClick={() => setIsSettingsOpen(true)}
      >
        <IoMdSettings size={iconsSize} />
      </button>
    </nav>
  );
};

export default NavBar;
