import { useEffect, useState } from "react";

export default function PerfIsland() {
  const [fps, setFps] = useState(0);
  const [mem, setMem] = useState(0);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();

    const loop = () => {
      frames++;
      const now = performance.now();

      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;

        if (performance.memory) {
          setMem(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }

      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        padding: "6px 10px",
        background: "#111",
        color: "#0f0",
        fontSize: 12,
        fontFamily: "monospace",
        borderRadius: 4,
        zIndex: 9999,
      }}
    >
      FPS: <b>{fps}</b> | Heap: <b>{mem} MB</b>
    </div>
  );
}
