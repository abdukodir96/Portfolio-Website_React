import { useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

// ---- CONFIG — the only things you should need to change ----------------
const FRAME_FOLDER = "frame"; // folder under /public
const FRAME_PREFIX = "ezgif-frame-"; // filename prefix
const FRAME_COUNT = 300; // total number of frames
const FRAME_EXT = ".jpg"; // file extension
const PAD_LENGTH = 3; // zero-padding width (001, 002, ...)
const SCROLL_HEIGHTS = 3; // scroll distance = N screen heights

function frameUrl(index: number) {
  // index is 1-based to match ezgif-frame-001.jpg ... ezgif-frame-300.jpg
  const num = String(index).padStart(PAD_LENGTH, "0");
  return `${BASE}${FRAME_FOLDER}/${FRAME_PREFIX}${num}${FRAME_EXT}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let currentFrameIndex = 0;
    let firstFrameRendered = false;
    let scrollDistance = window.innerHeight * SCROLL_HEIGHTS;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawFrame(img: HTMLImageElement) {
      if (!canvas || !ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      if (!imgWidth || !imgHeight) return;

      const canvasRatio = canvasWidth / canvasHeight;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;

      if (imgRatio > canvasRatio) {
        // Image is relatively wider than canvas -> fit height, crop sides
        drawHeight = canvasHeight;
        drawWidth = imgWidth * (canvasHeight / imgHeight);
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is relatively taller than canvas -> fit width, crop top/bottom
        drawWidth = canvasWidth;
        drawHeight = imgHeight * (canvasWidth / imgWidth);
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function renderCurrentFrame() {
      const img = images[currentFrameIndex];
      if (img) drawFrame(img);
    }

    function preloadFrames() {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.onload = () => {
          images[i] = img;
          if (i === 0 && !firstFrameRendered) {
            firstFrameRendered = true;
            drawFrame(img);
          }
        };
        img.onerror = () => {
          console.warn("Failed to load frame:", frameUrl(i + 1));
        };
        img.src = frameUrl(i + 1);
      }
    }

    function updateFrameFromScroll() {
      const fraction = clamp(window.scrollY / scrollDistance, 0, 1);
      currentFrameIndex = Math.round(fraction * (FRAME_COUNT - 1));
      renderCurrentFrame();
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateFrameFromScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    function onResize() {
      resizeCanvas();
      scrollDistance = window.innerHeight * SCROLL_HEIGHTS;
      renderCurrentFrame();
    }

    resizeCanvas();
    preloadFrames();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-0 bg-black"
      />
      <div
        className="fixed top-0 left-0 w-screen h-screen z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)"
        }}
      />
    </>
  );
}
