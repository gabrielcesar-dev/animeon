import { AnimeType } from "../@types/AnimeType"
import theme from "../constants/theme";
import Card from "./Card";
import { useEffect, useRef, useState } from "react";

interface CardsCarouselProps {
    animeList?: AnimeType[];
}

const CardsCarousel = ({ animeList }: CardsCarouselProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [resizeCarousel, setResizeCarousel] = useState<number>(0);
    let prevDate = 0;

    useEffect(() => {
        function handleResize() {
            setResizeCarousel((prev) => prev +  1);
        }
        window.addEventListener("resize", handleResize);


        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="absolute z-10">
            <div 
                id="card-carousel" 
                className="h-screen flex flex-nowrap pl-0 overflow-hidden items-center perspective-distant" 
                style={{ gap: `${theme.carouselGap}px` }}
                ref={containerRef}
            >
                {animeList && animeList.map((anime, index) => (
                <Card
                    idMal={anime.idMal}
                    key={anime.id + "-" + index + "-" + resizeCarousel}
                    src={anime.coverImage.extraLarge} 
                    alt={anime.title.english || anime.title.romaji}
                    title={anime.title.english || anime.title.romaji}
                    isCenter={ (() => {
                        const currentDate = anime.airingAtDay;
                        if (prevDate !== currentDate) {
                            prevDate = currentDate;
                            return true;
                        }
                        return false;
                    })()}
                    airingAt={anime.airingAt}
                    popularity={anime.popularity}
                    format={anime.format}
                    isAdult={anime.isAdult}
                />
                ))}
            </div>
        </div>
    );
}

export default CardsCarousel