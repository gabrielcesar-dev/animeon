import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimeType } from "../@types/AnimeType";
import { mediaFormatEnum } from "../@types/AiringTodayData";
import { IoClose } from "react-icons/io5";
import ToggleSwitch from "./ToggleSwitch";
import InputNumeric from "./InputNumeric";
import CheckBoxInnerLabel from "./CheckBoxInnerLabel";
import { PreferenceType } from "../@types/PreferenceType";
import defaultPreferences from "../constants/defaultPreferences";
import { filterAnimeByFormat, filterAnimeByIsAdult, filterAnimeByOnMal, filterAnimeByPopularity } from "../utils/animeFilters";
import { USER_PREFERENCES_KEY } from "../constants/localStorageKeys";

interface ConfigModalProps {
    setAnimeList: React.Dispatch<React.SetStateAction<AnimeType[]>>;
    rawAnimeList: AnimeType[];
    onClose: () => void;
    isOpen: boolean;
    initFilter?: boolean;
    setInitFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

type FilterFunctions = {
    [K in keyof PreferenceType]: (animeList: AnimeType[], preference: PreferenceType[K]) => AnimeType[];
};

const ConfigModal = ({ setAnimeList, rawAnimeList, onClose, isOpen, initFilter, setInitFilter }: ConfigModalProps) => {
    const [userPreferences, setUserPreferences] = useState<PreferenceType>({
        popularity: defaultPreferences.popularity,
        adultContent: defaultPreferences.adultContent,
        onMal: defaultPreferences.onMal,
        format: Object.keys(mediaFormatEnum).reduce((acc, format) => ({ ...acc, [format.toUpperCase()]: defaultPreferences.format[format.toUpperCase() as keyof typeof defaultPreferences.format] }), {} as { [key in keyof typeof mediaFormatEnum]: boolean }),
    });
    const [filters, ] = useState<FilterFunctions>({
        popularity: (animeList, preference) => filterAnimeByPopularity(animeList, typeof preference === 'string' ? defaultPreferences.popularity : preference),
        adultContent: filterAnimeByIsAdult,
        onMal:  filterAnimeByOnMal,
        format: filterAnimeByFormat,
    });

    const applyFilters = useCallback(() => {
        let filteredAnime = [...rawAnimeList];

        (Object.keys(filters) as Array<keyof PreferenceType>).forEach((key) => {
            filteredAnime = filters[key](filteredAnime, userPreferences[key] as never);
        });
        setAnimeList(filteredAnime);
    }, [rawAnimeList, filters, userPreferences, setAnimeList]);

    useEffect(() => {
        if (initFilter && setInitFilter) {
            applyFilters();
            setInitFilter(false);
        }
    },[applyFilters, initFilter, setInitFilter]);

    const didLoad = useRef(false);

    useEffect(() => {
        if (didLoad.current) return; // Prevents running twice in Strict Mode
        didLoad.current = true;

        const storedPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
        if (storedPreferences) {
            const parsedPreferences = JSON.parse(storedPreferences) as typeof userPreferences;
            setUserPreferences({
                popularity: parsedPreferences.popularity ?? defaultPreferences.popularity,
                adultContent: parsedPreferences.adultContent ?? defaultPreferences.adultContent,
                onMal: parsedPreferences.onMal ?? defaultPreferences.onMal,
                format: parsedPreferences.format ?? defaultPreferences.format,
            });
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(userPreferences));
    }, [userPreferences]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-50 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-500 ease-in-out`} >
        <section 
            className={`absolute top-0 left-0 lg:top-1/3 lg:left-1/2 w-full h-full lg:w-1/4 lg:h-auto px-4 py-16 rounded bg-palette-background lg:-translate-x-1/2 lg:-translate-y-1/4 z-100
                        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-500 ease-in-out`}
        >
            <button
                className="absolute right-2 top-2 text-white hover:text-gray-300 flex justify-center items-center cursor-pointer"
                onClick={async () => {
                    applyFilters();
                    onClose();
                }}
            >
                <IoClose size={30}/>
            </button>
            <h2 className="absolute left-2 top-2 text-white text-lg lg:text-2xl font-semibold font-poppins">Settings</h2>
            <hr className="absolute top-12 left-[2.5%] text-white w-[95%] "/>

            <form className="flex flex-col gap-4 mt-2 lg:mb-10">
                <ToggleSwitch 
                    label="Adult Content"
                    title="adultContent" 
                    isChecked={userPreferences.adultContent} 
                    onChange={(isChecked: boolean) => setUserPreferences({...userPreferences, adultContent: isChecked})} 
                />
                <ToggleSwitch
                    label="Only MyAnimeList"
                    title="onMal"
                    isChecked={userPreferences.onMal}
                    onChange={(isChecked: boolean) => setUserPreferences({...userPreferences, onMal: isChecked})}
                />
                <InputNumeric
                    label="Popularity"
                    value={userPreferences.popularity}
                    onChange={(e) => {
                        if (isNaN(parseInt(e.target.value))) {
                            setUserPreferences({...userPreferences, popularity: ""});
                            return;
                        } else {
                            setUserPreferences({...userPreferences, popularity: Math.max(parseInt(e.target.value), 0)});
                        }
                    }}
                    defaultValue={defaultPreferences.popularity}
                    placeholder={defaultPreferences.popularity.toString()}
                    name={"popularity"}
                />
                <div className="grid gap-2 grid-cols-1 md:gid-cols-2 lg:grid-cols-5">
                    {Object.keys(mediaFormatEnum).map((format) => (
                        <CheckBoxInnerLabel
                            key={format}
                            label={mediaFormatEnum[format as keyof typeof mediaFormatEnum]}
                            name={format}
                            checked={userPreferences.format[format as keyof typeof mediaFormatEnum]}
                            onChange={(e) => setUserPreferences({...userPreferences, format: {...userPreferences.format, [e.target.name]: e.target.checked}})}
                        />
                    ))}
                </div>      
            </form>
        </section>
    </div>
  )
}

export default ConfigModal