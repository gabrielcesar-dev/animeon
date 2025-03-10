export interface AiringTodayData {
  Page: {
    airingSchedules: {
      media: mediaType;
      airingAt: number;
    }[];
  };
}

export interface mediaType {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    extraLarge: string;
    color: string;
  };
  popularity: number;
  isAdult: boolean;
  format: keyof typeof mediaFormatEnum;
  idMal: number | null;
}

export enum mediaFormatEnum {
  TV = "Tv",
  TV_SHORT = "Tv Short",
  MOVIE = "Movie",
  SPECIAL = "Special",
  OVA = "OVA",
  ONA = "ONA",
  MUSIC = "Music",
  MANGA = "Manga",
  NOVEL = "Novel",
  ONE_SHOT = "One Shot",
}
