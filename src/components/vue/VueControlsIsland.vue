<template>
  <div :style="styles.root">
    <button
      type="button"
      :style="styles.button(backend === 'bun')"
      @click="emit('update-backend', 'bun')"
    >
      Bun
    </button>

    <button
      type="button"
      :style="styles.button(backend === 'node')"
      @click="emit('update-backend', 'node')"
    >
      Node
    </button>

    <div v-if="metrics" :style="styles.metricsWrap">
      <span :style="styles.pill">
        <span :style="styles.label">Query</span>
        <span :style="styles.value">{{ metrics.query ?? "—" }} ms</span>
      </span>

      <span :style="styles.pill">
        <span :style="styles.label">Cold</span>
        <span :style="styles.value">{{ metrics.cold ?? "—" }} ms</span>
      </span>

      <span :style="styles.pill">
        <span :style="styles.label">Runtime</span>
        <span :style="styles.value">{{ metrics.runtime ?? "—" }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  backend: String,
  metrics: Object,
});

const emit = defineEmits(["update-backend"]);

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
  },
  button: (active) => ({
    appearance: "none",
    border: "1px solid rgba(0,0,0,0.18)",
    background: active ? "rgba(0,0,0,0.06)" : "white",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: active ? 700 : 500,
    lineHeight: "18px",
  }),
  metricsWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "6px",
    paddingLeft: "10px",
    borderLeft: "1px solid rgba(0,0,0,0.12)",
    flexWrap: "wrap",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 8px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.10)",
    fontSize: "12px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    whiteSpace: "nowrap",
  },
  label: { opacity: 0.65 },
  value: { fontWeight: 700 },
};
</script>
