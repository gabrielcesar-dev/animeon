import { AnimeType } from "../@types/AnimeType"
import theme from "../constants/theme";
import Card from "./Card";

interface CardsCarouselProps {
    animeList?: AnimeType[];
}

const CardsCarousel = ({ animeList }: CardsCarouselProps) => {
    let prevDate = 0;

    return (
        <div className="absolute z-10">
            <div 
                id="card-carousel" 
                className="h-screen flex flex-nowrap pl-0 overflow-hidden items-center perspective-distant" 
                style={{ gap: `${theme.carouselGap}px` }}
            >
                {animeList && animeList.map((anime) => (
                <Card
                    idMal={anime.idMal}
                    key={anime.id}
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