import { FaGithub } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'


interface NavBarProps {
    isSettingsOpen: boolean;
    setIsSettingsOpen: (value: boolean) => void;
    iconsSize: number;
}

const NavBar = ({ isSettingsOpen, setIsSettingsOpen, iconsSize }: NavBarProps) => {
  return (
    <nav className="absolute top-0 right-1 m-0 p-0 flex flex-col gap-2 z-30">
        <a 
            className="flex justify-center items-center rounded-lg p-0 hover:text-palette-accent-hover text-gray-600 bg-transparent cursor-pointer"
            href={import.meta.env.VITE_GITHUB_URL as string}
            target="_blank"
            rel="noopener noreferrer"
        >
            <FaGithub size={iconsSize} />
        </a>
        <button 
        className={`p-0 flex justify-center items-center hover:text-palette-accent-hover text-gray-600 bg-transparent cursor-pointer
                    ${isSettingsOpen ? "opacity-0 invisible" : "opacity-100 visible"} transition-all duration-500 ease-in-out hover:rotate-180 hover:duration-700`}
        onClick={() => setIsSettingsOpen(true)}
        >
        <IoMdSettings size={iconsSize}/>
        </button>
    </nav>
  )
}

export default NavBar