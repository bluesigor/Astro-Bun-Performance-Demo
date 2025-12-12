export default function ControlsIsland({ backend, setBackend, metrics }) {
  const styles = {
    root: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
      flexWrap: "wrap",
    },
    button: (active) => ({
      appearance: "none",
      border: "1px solid rgba(0,0,0,0.18)",
      background: active ? "rgba(0,0,0,0.06)" : "white",
      padding: "6px 10px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: active ? 700 : 500,
      lineHeight: "18px",
    }),
    metricsWrap: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginLeft: 6,
      paddingLeft: 10,
      borderLeft: "1px solid rgba(0,0,0,0.12)",
      flexWrap: "wrap",
    },
    pill: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "5px 8px",
      borderRadius: 999,
      background: "rgba(0,0,0,0.04)",
      border: "1px solid rgba(0,0,0,0.10)",
      fontSize: 12,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      whiteSpace: "nowrap",
    },
    label: { opacity: 0.65 },
    value: { fontWeight: 700 },
  };

  return (
    <div style={styles.root}>
      <button
        onClick={() => setBackend("bun")}
        style={styles.button(backend === "bun")}
        type="button"
      >
        Bun
      </button>

      <button
        onClick={() => setBackend("node")}
        style={styles.button(backend === "node")}
        type="button"
      >
        Node
      </button>

      {metrics && (
        <div style={styles.metricsWrap}>
          <span style={styles.pill}>
            <span style={styles.label}>Query</span>
            <span style={styles.value}>{metrics.query ?? "—"} ms</span>
          </span>
          <span style={styles.pill}>
            <span style={styles.label}>Cold</span>
            <span style={styles.value}>{metrics.cold ?? "—"} ms</span>
          </span>
          <span style={styles.pill}>
            <span style={styles.label}>Runtime</span>
            <span style={styles.value}>{metrics.runtime ?? "—"}</span>
          </span>
        </div>
      )}
    </div>
  );
}
