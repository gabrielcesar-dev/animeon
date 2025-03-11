import { useState } from "react";

interface DayCardProps {
  time: number;
}

const DayCard = ({ time }: DayCardProps) => {
  const [userLanguage] = useState<string>(() => {
    return navigator.language;
  });

  const date = new Date(time * 1000);
  const weekDay = date.toLocaleDateString(userLanguage, {
    weekday: "long",
  });

  const dateFormatted = date.toLocaleDateString(userLanguage, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZoneName: "short",
  });

  return (
    <div className="absolute -top-20 left-1/2 z-20 flex min-w-1/2 translate-x-[-50%] items-center justify-center rounded bg-palette-accent px-2 py-4 duration-75 ease-in-out outline-none focus:outline-none">
      <time
        className="font-poppins text-2xl font-light text-white"
        dateTime={dateFormatted}
        title={dateFormatted}
      >
        {weekDay}
      </time>
    </div>
  );
};

export default DayCard;
