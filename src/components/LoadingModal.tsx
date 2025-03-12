interface LoadingModalProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  message: string;
  subMessage?: string;
}

const LoadingModal = ({ message, subMessage, ...props }: LoadingModalProps) => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-0 bg-palette-background">
      <img className="h-1/4 object-cover" alt="Loading image" {...props} />
      <div>
        <p className="font-Bigger text-4xl font-black text-palette-primary">
          {message}
        </p>
        <p className="font-Bigger text-center text-xl font-light text-palette-secondary">
          {subMessage}
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
