import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Observer } from "gsap/all";
import { AnimeType } from "../@types/AnimeType";
import horizontalLoop from "../libs/horizontalLoop";
import theme from "../constants/theme";

interface GridCanvasProps {
    backgroundColor: string;
    AccentColor: string;
    animeList: AnimeType[];
}

gsap.registerPlugin(Observer);

const GridCanvas = ({ backgroundColor, AccentColor, animeList }: GridCanvasProps) => {
    const [ratio, setRatio] = useState(window.devicePixelRatio || 1);
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const prevOffset = useRef<number>(0);

    const drawGrid = useCallback((offset: number = 0) => {
        if (!ctx) return;

        ctx.clearRect(0, 0, size.width, size.height);
        
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size.width, size.height);

        ctx.fillStyle = AccentColor;

        const [dotSize, gap] = [0.95, 30];
        const [rows, cols] = [Math.ceil(size.width / gap) + 30, Math.ceil(size.height / gap) + 15];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const dotX = i * gap + -offset;
                const dotY = j * gap;

                ctx.beginPath();
                ctx.arc(dotX, dotY, dotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }, [AccentColor, backgroundColor, ctx, size.height, size.width]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        setCtx(context);
    }, [canvasRef]);

    useEffect(() => {
        if (!ctx) return;

        ctx.scale(ratio, ratio);
    }, [ratio, ctx]);

    useEffect(() => {
        drawGrid();
    }, [drawGrid]);

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
            setRatio(window.devicePixelRatio || 1);

        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useGSAP(() => {
        if (animeList?.length === 0) return;

        const loop = horizontalLoop(".card-carousel__item", {
        repeat: -1,
        center: true,
        paddingRight: theme.carouselGap,
        });

        const slow = gsap.to(loop, { timeScale: 0, duration: 0.5, ease: "power1.inOut" });

        loop.timeScale(0);

        const observer = Observer.create({
            target: "#card-carousel",
            type: "pointer,touch,wheel",
            wheelSpeed: -0.1,

            onChange: (self) => {
                const delta = Math.abs(self.deltaX) > Math.abs(self.deltaY) ? self.deltaX : self.deltaY;

                loop.timeScale(-delta);
                slow.invalidate().restart();

                const offset = (prevOffset.current + -(delta * (1.2))) % 30;
                drawGrid(offset);
                prevOffset.current += -delta;
            },
        });
        return () => {
            observer.kill();
            loop.kill();
            slow.kill();
        };
    }, { dependencies: [animeList, drawGrid] });

    return (
        <canvas 
            id="grid-canvas" 
            className="absolute top-0 left-0 z-0"
            ref={canvasRef}
            width={size.width * ratio}
            height={size.height * ratio}
            style={{ width: size.width, height: size.height }}
        />
    );
};

export default GridCanvas;
