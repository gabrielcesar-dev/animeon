import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimeType } from "../@types/AnimeType";
import { mediaFormatEnum } from "../@types/AiringTodayData";
import ToggleSwitch from "./ToggleSwitch";
import InputNumeric from "./InputNumeric";
import CheckBoxInnerLabel from "./CheckBoxInnerLabel";
import { PreferenceType } from "../@types/PreferenceType";
import defaultPreferences from "../constants/defaultPreferences";
import {
  filterAnimeByFormat,
  filterAnimeByIsAdult,
  filterAnimeByOnMal,
  filterAnimeByPopularity,
} from "../utils/animeFilters";
import { USER_PREFERENCES_KEY } from "../constants/localStorageKeys";
import IoCloseGradient from "./IoCloseGradient";

interface ConfigModalProps {
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeType[]>>;
  rawAnimeList: AnimeType[];
  onClose: () => void;
  isOpen: boolean;
  initFilter?: boolean;
  setInitFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

type FilterFunctions = {
  [K in keyof PreferenceType]: (
    animeList: AnimeType[],
    preference: PreferenceType[K]
  ) => AnimeType[];
};

const ConfigModal = ({
  setAnimeList,
  rawAnimeList,
  onClose,
  isOpen,
  initFilter,
  setInitFilter,
}: ConfigModalProps) => {
  const [userPreferences, setUserPreferences] = useState<PreferenceType>({
    popularity: defaultPreferences.popularity,
    adultContent: defaultPreferences.adultContent,
    onMal: defaultPreferences.onMal,
    format: Object.keys(mediaFormatEnum).reduce(
      (acc, format) => ({
        ...acc,
        [format.toUpperCase()]:
          defaultPreferences.format[
            format.toUpperCase() as keyof typeof defaultPreferences.format
          ],
      }),
      {} as { [key in keyof typeof mediaFormatEnum]: boolean }
    ),
  });
  const [filters] = useState<FilterFunctions>({
    popularity: (animeList, preference) =>
      filterAnimeByPopularity(
        animeList,
        typeof preference === "string"
          ? defaultPreferences.popularity
          : preference
      ),
    adultContent: filterAnimeByIsAdult,
    onMal: filterAnimeByOnMal,
    format: filterAnimeByFormat,
  });

  const applyFilters = useCallback(() => {
    let filteredAnime = [...rawAnimeList];

    (Object.keys(filters) as Array<keyof PreferenceType>).forEach((key) => {
      filteredAnime = filters[key](
        filteredAnime,
        userPreferences[key] as never
      );
    });

    setAnimeList(filteredAnime);
  }, [rawAnimeList, filters, userPreferences, setAnimeList]);

  useEffect(() => {
    if (initFilter && setInitFilter) {
      setInitFilter(false);
      applyFilters();
    }
  }, [applyFilters, initFilter, setInitFilter]);

  const didLoad = useRef(false);

  useEffect(() => {
    if (didLoad.current) return; // Prevents running twice in Strict Mode
    didLoad.current = true;

    const storedPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
    if (storedPreferences) {
      const parsedPreferences = JSON.parse(
        storedPreferences
      ) as typeof userPreferences;
      setUserPreferences({
        popularity:
          parsedPreferences.popularity ?? defaultPreferences.popularity,
        adultContent:
          parsedPreferences.adultContent ?? defaultPreferences.adultContent,
        onMal: parsedPreferences.onMal ?? defaultPreferences.onMal,
        format: parsedPreferences.format ?? defaultPreferences.format,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(userPreferences));
  }, [userPreferences]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-full bg-black/50 ${isOpen ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-500 ease-in-out`}
    >
      <section
        className={`absolute top-0 left-0 z-100 h-full w-full rounded bg-palette-background-modal px-4 py-16 lg:top-1/3 lg:left-1/2 lg:h-auto lg:w-1/3 lg:-translate-x-1/2 lg:-translate-y-1/4 xl:w-7/24 ${isOpen ? "visible opacity-100" : "invisible opacity-0"} shadow-md shadow-palette-shadow transition-all duration-500 ease-in-out`}
      >
        <button
          className="absolute top-2 right-2 flex cursor-pointer items-center justify-center transition-all ease-in-out hover:scale-110"
          onClick={async () => {
            applyFilters();
            onClose();
          }}
        >
          <IoCloseGradient
            startColor="var(--color-palette-primary)"
            endColor="var(--color-palette-secondary)"
          />
        </button>
        <h2 className="absolute top-2 left-2 bg-gradient-to-r from-palette-primary to-palette-secondary bg-clip-text font-poppins text-lg font-semibold text-transparent lg:text-2xl">
          Settings
        </h2>
        <hr className="absolute top-12 left-0 h-0.5 w-full bg-palette-border" />

        <form className="mt-2 flex flex-col gap-4 lg:mb-10">
          <ToggleSwitch
            label="Adult Content"
            title="adultContent"
            isChecked={userPreferences.adultContent}
            onChange={(isChecked: boolean) =>
              setUserPreferences({
                ...userPreferences,
                adultContent: isChecked,
              })
            }
          />
          <ToggleSwitch
            label="Only MyAnimeList"
            title="onMal"
            isChecked={userPreferences.onMal}
            onChange={(isChecked: boolean) =>
              setUserPreferences({ ...userPreferences, onMal: isChecked })
            }
          />
          <InputNumeric
            label="Popularity"
            value={userPreferences.popularity}
            onChange={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                setUserPreferences({ ...userPreferences, popularity: "" });
                return;
              } else {
                setUserPreferences({
                  ...userPreferences,
                  popularity: Math.max(parseInt(e.target.value), 0),
                });
              }
            }}
            defaultValue={defaultPreferences.popularity}
            placeholder={defaultPreferences.popularity.toString()}
            name={"popularity"}
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Object.keys(mediaFormatEnum).map((format) => (
              <CheckBoxInnerLabel
                key={format}
                label={mediaFormatEnum[format as keyof typeof mediaFormatEnum]}
                name={format}
                checked={
                  userPreferences.format[format as keyof typeof mediaFormatEnum]
                }
                onChange={(e) =>
                  setUserPreferences({
                    ...userPreferences,
                    format: {
                      ...userPreferences.format,
                      [e.target.name]: e.target.checked,
                    },
                  })
                }
              />
            ))}
          </div>
        </form>
      </section>
    </div>
  );
};

export default ConfigModal;
