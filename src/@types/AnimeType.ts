import { mediaType } from "./AiringTodayData";

export interface AnimeType extends mediaType {
  airingAt: number;
  airingAtDay: number;
}
