import { useState } from "react";

interface DayCardProps {
    time: number;
}

const DayCard = ({ time }: DayCardProps) => {
    const [userLanguage, ] = useState<string>(() => {
        return navigator.language;
    });

    const date = new Date(time * 1000);
    const weekDay = date.toLocaleDateString(userLanguage, {
        weekday: 'long',
    });


    const dateFormatted = date.toLocaleDateString(userLanguage, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZoneName: 'short',
    });

  return (
    <div 
        className="absolute left-1/2 -top-20 flex justify-center items-center bg-palette-accent z-20 rounded py-4 translate-x-[-50%] ease-in-out duration-75 w-1/2
                   outline-none focus:outline-none"
    >
        <time className="text-2xl text-white font-light font-poppins" dateTime={dateFormatted} title={dateFormatted}>
            { weekDay }
        </time>
    </div>
  )
}

export default DayCard