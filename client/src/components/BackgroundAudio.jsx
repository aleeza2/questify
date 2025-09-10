import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio("/sound/medieval-background-351307.mp3");
    a.loop = true;
    a.volume = 0.18;        // nice & subtle
    a.preload = "auto";     // start buffering
    a.playsInline = true;   // iOS
    audioRef.current = a;

    a.play().catch(() => { /* normal on first load */ });

    const unlock = () => {
      a.muted = false;
      a.play().catch(() => {});
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown",   unlock, { once: true });
    window.addEventListener("touchstart",unlock, { once: true });

    return () => {
      try { a.pause(); a.src = ""; } catch {}
    };
  }, []);

  return null; // no UI
}
