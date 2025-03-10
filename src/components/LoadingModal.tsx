interface LoadingModalProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    message: string;
    subMessage?: string;
}

const LoadingModal = ({ message, subMessage, ...props}: LoadingModalProps) => {
  return (
    <div className="relative flex items-center h-screen w-screen flex-col gap-0 bg-palette-background">
        <img 
            className="object-cover h-1/4"
            {...props}
        />
        <div>
          <p className="text-palette-accent text-4xl font-Bigger font-black">{ message }</p>
          <p className="text-gray-500 text-xl font-Bigger font-light text-center">{ subMessage }</p>
        </div>
    </div>
  )
}

export default LoadingModal;