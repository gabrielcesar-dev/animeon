import { ImgHTMLAttributes, useState } from "react";
import DayCard from "./DayCard";

interface CardProps extends ImgHTMLAttributes<HTMLImageElement> {
  idMal: number | null;
  isCenter?: boolean;
  airingAt: number;
  popularity: number;
  format: string;
  isAdult: boolean;
}

const Card = ({
  idMal,
  isCenter,
  airingAt,
  popularity,
  format,
  isAdult,
  ...props
}: CardProps) => {
  const animeByIdURL = import.meta.env.VITE_ANIME_BY_ID_URL + idMal;
  const animeByTitleURL = import.meta.env.VITE_ANIME_BY_TITLE_URL + props.title;
  const [url] = useState<string>(() => {
    if (idMal) {
      return animeByIdURL;
    }
    return animeByTitleURL;
  });
  const [userLanguage] = useState<string>(() => {
    return navigator.language;
  });
  const date = new Date(airingAt * 1000);
  const airingAtFormatted = date.toLocaleTimeString(userLanguage, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const airingAtDate = date.toLocaleDateString(userLanguage, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  return (
    <div
      data-popularity={popularity}
      data-format={format}
      data-adult={isAdult}
      data-airing-at={airingAt}
      className="card-carousel__item relative flex h-[600px] w-[344px] flex-shrink-0 flex-grow basis-auto flex-col gap-0 bg-slate-950 p-[6px] will-change-transform"
    >
      <a
        className="flex-1 overflow-hidden"
        href={url}
        target="blank"
        rel="noopener noreferrer"
      >
        <img className="size-full object-cover" {...props} />
      </a>

      <div className="bg-slate-950">
        <p className="truncate px-1 py-0 text-center font-poppins text-sm text-white">
          {props.title}
        </p>
      </div>

      <div className="py-auto absolute right-4 bottom-8 rounded-md bg-palette-accent px-2">
        <time
          className="font-poppins text-sm font-medium text-white"
          dateTime={airingAtDate}
          title={airingAtDate}
        >
          {airingAtFormatted}
        </time>
      </div>

      {isCenter && <DayCard time={airingAt} />}
    </div>
  );
};

export default Card;
