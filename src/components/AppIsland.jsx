import { useState } from "react";
import ControlsIsland from "./ControlsIsland.jsx";
import GridIsland from "./GridIsland.jsx";
import PerfIsland from "./PerfIsland.jsx";

export default function AppIsland() {
  const [backend, setBackend] = useState("bun");
  const [metrics, setMetrics] = useState(null);

  return (
    <>
      <ControlsIsland
        backend={backend}
        setBackend={setBackend}
        metrics={metrics}
      />

      <GridIsland backend={backend} onMetrics={setMetrics} />
    </>
  );
}
