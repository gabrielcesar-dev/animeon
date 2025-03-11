import { mediaFormatEnum } from "./AiringTodayData";

export interface PreferenceType {
  popularity: string | number;
  adultContent: boolean;
  onMal: boolean;
  format: { [key in keyof typeof mediaFormatEnum]: boolean };
}
