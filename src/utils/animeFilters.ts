import { AnimeType} from "../@types/AnimeType";
import { PreferenceType } from "../@types/PreferenceType";

export const filterAnimeByIsAdult = (anime: AnimeType[], AllowAdultContent: boolean): AnimeType[] => {
    return anime.filter((anime) => AllowAdultContent || !anime.isAdult);
}

export const filterAnimeByFormat = (anime: AnimeType[], format: PreferenceType["format"]): AnimeType[] => {
    return anime.filter((anime) => format[anime.format]);
}

export const filterAnimeByPopularity = (anime: AnimeType[], popularity: number = 0): AnimeType[] => {
    if(popularity <= 0) return anime;
    return anime.filter((anime) => anime.popularity >= popularity);
}

export const filterAnimeByOnMal = (anime: AnimeType[], onMal: boolean = false): AnimeType[] => {
    return anime.filter((anime) => !onMal || anime.idMal);
}

export const filterAnimeByImage = (anime: AnimeType[], hasImage: boolean = false): AnimeType[] => {
    return anime.filter((anime) => !hasImage || anime.coverImage.extraLarge);
}

export const filterAnimeByKey = (animeList: AnimeType[]): AnimeType[] => {
    return Array.from(
      new Map(animeList.map((anime) => [anime.id, anime])).values()
    );
}