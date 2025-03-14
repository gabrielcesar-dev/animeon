import { useQuery } from "@apollo/client";
import { GET_AIRING_TODAY } from "../graphql/airingToday";
import { useEffect, useState } from "react";
import { AiringTodayData } from "../@types/AiringTodayData";
import { AnimeType } from "../@types/AnimeType";
import CardsCarousel from "../components/CardsCarousel";
import GridCanvas from "../components/GridCanvas";
import theme from "../constants/theme";
import { getTodayEndTime, getTodayStartTime } from "../utils/getDayTime";
import { animeSortByPopularityOnCenter } from "../utils/animeSort";
import ConfigModal from "../components/ConfigModal";
import LoadingModal from "../components/LoadingModal";
import loadingGif from "../assets/loading.gif";
import errorGif from "../assets/error.gif";
import { filterAnimeByKey } from "../utils/animeFilters";

interface HeroProps {
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = ({
  isSettingsOpen,
  setIsSettingsOpen,
  isLoading,
  setIsLoading,
}: HeroProps) => {
  const [rawAnimeList, setRawAnimeList] = useState<AnimeType[]>([]);
  const [animeList, setAnimeList] = useState<AnimeType[]>([]);
  const [startTime, setStartTime] = useState<number>(
    Math.floor(getTodayStartTime() / 1000)
  );
  const [endTime, setEndTime] = useState<number>(
    Math.floor(getTodayEndTime() / 1000)
  );
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [filterAfterLoad, setFilterAfterLoad] = useState<boolean>(false);

  const elapsedDay = endTime - startTime + 1;

  const { data, error } = useQuery<AiringTodayData>(GET_AIRING_TODAY, {
    variables: { start: startTime, end: endTime },
    skip: currentDay >= 7,
  });

  useEffect(() => {
    if (data) {
      setIsLoading(false);

      const newAnimes = data.Page.airingSchedules.map((schedule) => ({
        ...schedule.media,
        airingAtDay: startTime,
        airingAt: schedule.airingAt,
      }));

      const newAnimesSorted = animeSortByPopularityOnCenter(newAnimes);

      setRawAnimeList((prev) =>
        filterAnimeByKey([...prev, ...newAnimesSorted])
      );
      setFilterAfterLoad(true);

      if (currentDay < 7) {
        setCurrentDay((day) => day + 1);
        setStartTime((start) => start + elapsedDay);
        setEndTime((end) => end + elapsedDay);
      }
    }
  }, [data]);

  if (error) {
    setTimeout(() => window.location.reload(), 10000);

    return (
      <LoadingModal
        message="Error loading data"
        subMessage="Reloading in 10 seconds..."
        title={"Error Screen"}
        alt={"Error Screen"}
        src={errorGif}
      />
    );
  } else if (isLoading) {
    return (
      <LoadingModal
        message="Loading..."
        title={"Loading Screen"}
        alt={"Loading Screen"}
        src={loadingGif}
      />
    );
  }

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <CardsCarousel animeList={animeList} />

      <GridCanvas
        backgroundColor={theme.colors.gridBackground}
        AccentColor={theme.colors.gridDots}
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
