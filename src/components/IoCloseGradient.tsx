interface IoCloseGradientProps {
  startColor: string;
  endColor: string;
}

const IoCloseGradient = ({ startColor, endColor }: IoCloseGradientProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 512 512"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: startColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: endColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 0034 34l95-95 95 95a24 24 0 0034-34z"
        fill="url(#gradient1)"
      />
    </svg>
  );
};

export default IoCloseGradient;
