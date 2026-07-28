"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
] as const;

type Direction = "next" | "prev";
type Role = "center" | "left" | "right" | "back";

const EASING = "cubic-bezier(0.4,0,0.2,1)";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const navigate = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setActiveIndex((previous) =>
        direction === "next"
          ? (previous + 1) % IMAGES.length
          : (previous + 3) % IMAGES.length,
      );

      window.setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") navigate("prev");
      if (event.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const roles = {
    center: activeIndex,
    left: (activeIndex + 3) % IMAGES.length,
    right: (activeIndex + 1) % IMAGES.length,
    back: (activeIndex + 2) % IMAGES.length,
  };

  const roleFor = (index: number) =>
    (Object.entries(roles).find(([, value]) => value === index)?.[0] ??
      "back") as Role;

  const itemStyle = (role: Role): React.CSSProperties => {
    const side = role === "left" || role === "right";

    return {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transform:
        role === "center"
          ? `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`
          : "translateX(-50%) scale(1)",
      filter:
        role === "center"
          ? "blur(0)"
          : role === "back"
            ? "blur(4px)"
            : "blur(2px)",
      opacity: side ? 0.85 : 1,
      zIndex: role === "center" ? 20 : side ? 10 : 5,
      left:
        role === "left"
          ? isMobile
            ? "20%"
            : "30%"
          : role === "right"
            ? isMobile
              ? "80%"
              : "70%"
            : "50%",
      height:
        role === "center"
          ? isMobile
            ? "60%"
            : "92%"
          : role === "back"
            ? isMobile
              ? "13%"
              : "22%"
            : isMobile
              ? "16%"
              : "28%",
      bottom:
        role === "center"
          ? isMobile
            ? "22%"
            : 0
          : isMobile
            ? "32%"
            : "12%",
      transition: `transform 650ms ${EASING}, filter 650ms ${EASING}, opacity 650ms ${EASING}, left 650ms ${EASING}`,
      willChange: "transform, filter, opacity",
    };
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color 650ms ${EASING}`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main className="relative h-screen w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            zIndex: 50,
            backgroundImage: GRAIN,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 flex select-none items-center justify-center uppercase"
          style={{
            zIndex: 2,
            top: "18%",
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(90px, 28vw, 380px)",
            fontWeight: 900,
            color: "white",
            opacity: 1,
            lineHeight: 1,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          3D SHAPE
        </div>

        <div
          className="absolute inset-0"
          style={{ zIndex: 3 }}
          aria-live="polite"
          aria-label={`Figurine ${activeIndex + 1} of ${IMAGES.length}`}
        >
          {IMAGES.map((image, index) => {
            const role = roleFor(index);
            return (
              <div key={image.src} style={itemStyle(role)} aria-hidden={role !== "center"}>
                <img
                  src={image.src}
                  alt={role === "center" ? `TOONHUB figurine ${index + 1}` : ""}
                  draggable={false}
                  className="h-full w-full"
                  style={{
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute top-6 left-4 text-xs font-semibold uppercase text-white opacity-90 sm:left-8"
          style={{ zIndex: 60, letterSpacing: "0.18em" }}
        >
          TOONHUB
        </div>

        <section
          className="absolute bottom-6 left-4 max-w-[320px] sm:bottom-20 sm:left-24"
          style={{ zIndex: 60 }}
        >
          <p
            className="mb-2 text-base font-bold tracking-widest text-white uppercase opacity-95 sm:mb-3 sm:text-[22px]"
            style={{ letterSpacing: "0.02em" }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="mb-4 hidden text-xs text-white opacity-85 sm:mb-5 sm:block sm:text-sm"
            style={{ lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("prev")}
              disabled={isAnimating}
              aria-label="Previous figurine"
              className="toon-nav flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white sm:h-16 sm:w-16"
            >
              <ArrowLeft size={26} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate("next")}
              disabled={isAnimating}
              aria-label="Next figurine"
              className="toon-nav flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white sm:h-16 sm:w-16"
            >
              <ArrowRight size={26} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </section>

        <div
          className="absolute right-4 bottom-6 sm:right-10 sm:bottom-20"
          style={{ zIndex: 60 }}
        >
          <a
            href="#discover"
            className="group flex items-center gap-2 text-white no-underline opacity-95 transition-opacity duration-200 hover:opacity-100 sm:gap-3"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            DISCOVER IT
            <ArrowRight
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 sm:h-8 sm:w-8"
              strokeWidth={2.25}
              aria-hidden="true"
            />
          </a>
        </div>
      </main>
    </div>
  );
}
