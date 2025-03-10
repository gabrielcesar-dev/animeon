import { AnimeType } from "../@types/AnimeType";

export const animeSortByPopularityOnCenter = (anime: AnimeType[]): AnimeType[] => {
  let left = 0;
  let right = anime.length - 1;

  const sorted = [...anime].sort((a, b) => a.popularity - b.popularity);

  const sortedAnime: AnimeType[] = Array(sorted.length);

  for (let i = 0; i < sorted.length; i++) {
    if (i % 2 === 0) {
      sortedAnime[left++] = { ...sorted[i] };
    } else {
      sortedAnime[right--] = { ...sorted[i] };
    }
  }
  return sortedAnime;
};
