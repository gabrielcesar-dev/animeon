import { AnimeType } from "../@types/AnimeType";

export const animeSortByPopularityOnCenter = (anime: AnimeType[]): AnimeType[] => {
  const sorted = [...anime].sort((a, b) => b.popularity - a.popularity);

  const sortedAnime: AnimeType[] = Array(sorted.length);

  const centerIndex = Math.floor((sorted.length - 1) / 2);

  let rightPointer = centerIndex;
  let leftPointer = centerIndex - 1;

  sortedAnime[centerIndex] = { ...sorted[0] };

  for (let i = 1; i < sorted.length; i++) {
    if (i % 2 !== 0) {
      sortedAnime[++rightPointer] = { ...sorted[i] };
    } else {
      sortedAnime[leftPointer--] = { ...sorted[i] };
    }
  }

  return sortedAnime;
};

