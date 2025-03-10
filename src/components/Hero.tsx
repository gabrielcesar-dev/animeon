import { useQuery } from "@apollo/client";
import { GET_AIRING_TODAY } from "../graphql/airingToday";
import { useEffect, useState } from "react";
import { AiringTodayData } from "../@types/AiringTodayData";
import { AnimeType } from "../@types/AnimeType";
import CardsCarousel from "./CardsCarousel";
import GridCanvas from "./GridCanvas";
import theme from "../constants/theme";
import { getTodayEndTimeUTC, getTodayStartTimeUTC } from "../utils/getDayTimeUTC";
import { animeSortByPopularityOnCenter } from "../utils/animeSort";
import ConfigModal from "./ConfigModal";
import NavBar from "./NavBar";
import LoadingModal from "./LoadingModal";
import loadingGif from "../assets/loading.gif";
import errorGif from "../assets/error.gif";
import { filterAnimeByKey } from "../utils/animeFilters";

const Hero = () => {
  const [rawAnimeList, setRawAnimeList] = useState<AnimeType[]>([]);
  const [animeList, setAnimeList] = useState<AnimeType[]>([]);
  const [startTime, setStartTime] = useState<number>(Math.floor(getTodayStartTimeUTC() / 1000));
  const [endTime, setEndTime] = useState<number>(Math.floor(getTodayEndTimeUTC() / 1000));
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [filterAfterLoad, setFilterAfterLoad] = useState<boolean>(false);

  const elapsedDay = endTime - startTime + 1;

  const { data, loading, error } = useQuery<AiringTodayData>(GET_AIRING_TODAY, {
    variables: { start: startTime, end: endTime },
    skip: currentDay >= 7,
  });

  useEffect(() => {
    if (data) {
      const newAnimes = data.Page.airingSchedules.map((schedule) => ({
        ...schedule.media,
        airingAtDay: startTime,
        airingAt: schedule.airingAt,
      }));

      const newAnimesSorted = animeSortByPopularityOnCenter(newAnimes);

      setRawAnimeList((prev) => [...prev, ...newAnimesSorted]);

      if (currentDay < 7) {
        setCurrentDay((day) => day + 1);
        setStartTime((start) => start + elapsedDay);
        setEndTime((end) => end + elapsedDay);
      }
    }
  }, [data]);

  useEffect(() => {
    if (currentDay >= 7) {
      setIsLoading(false);
      setRawAnimeList((prev) => filterAnimeByKey(prev));
      setFilterAfterLoad(true);
    }
  }, [currentDay, setFilterAfterLoad, setIsLoading]);

  if(error) {
    setTimeout(() => window.location.reload(), 5000);

    return <LoadingModal message="Error loading data..." subMessage="Reloading in 5 seconds..." title={"Error Screen"} alt={"Error Screen"} src={errorGif} />
  } else if (isLoading || loading) {
    return <LoadingModal message="Loading..." title={"Loading Screen"} alt={"Loading Screen"} src={loadingGif} />
  }

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <NavBar isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} iconsSize={35} />

      <CardsCarousel animeList={animeList} />

      <GridCanvas
        backgroundColor={theme.colors.backgroundColor}
        AccentColor={theme.colors.accentColor}
        animeList={animeList}
      />
      
      <ConfigModal 
        setAnimeList={setAnimeList} 
        rawAnimeList={rawAnimeList}
        onClose={() => setIsSettingsOpen(false)} 
        isOpen={isSettingsOpen}
        initFilter={filterAfterLoad}
        setInitFilter={setFilterAfterLoad}
      />
    </section>
  );
};

export default Hero;
