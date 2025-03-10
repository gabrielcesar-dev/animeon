import { IoMdSettings } from 'react-icons/io';
import logo from '../assets/logo.jpg';
import { FaGithub } from 'react-icons/fa';
import { useState } from 'react';


interface NavBarProps {

    setIsSettingsOpen: (value: boolean) => void;
    iconsSize: number;
    isLoading: boolean;
}

const NavBar = ({ setIsSettingsOpen, iconsSize, isLoading }: NavBarProps) => {
  const [host, ] = useState(window.location.origin);

  if (isLoading) return null;

  return (
    <nav className="absolute bottom-1 lg:bottom-full lg:translate-y-full z-20 flex w-full justify-center items-center gap-x-20">
        <a 
            className="flex justify-center items-center rounded-lg p-0 hover:text-palette-accent-hover text-gray-600 bg-transparent cursor-pointer"
            href={import.meta.env.VITE_GITHUB_URL as string}
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaGithub size={iconsSize}/>
        </a>

        <a
            className="flex justify-center items-center cursor-pointer bg-transparent"
            href={host}
        >
          <img
            style={{width: iconsSize, height: iconsSize}}
            className="rounded-lg object-cover"
            src={logo}
            alt="logo"
          />
        </a>

        <button 
        className={`p-0 flex justify-center items-center hover:text-palette-accent-hover text-gray-600 bg-transparent cursor-pointer transition-all duration-500 ease-in-out hover:rotate-180 hover:duration-700`}
        onClick={() => setIsSettingsOpen(true)}
        >
        <IoMdSettings size={iconsSize}/>
        </button>
    </nav>
  );
}

export default NavBar;