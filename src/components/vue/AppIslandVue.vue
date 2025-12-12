<template>
  <div class="app-island-vue">
    <VueControlsIsland
      :backend="backend"
      :metrics="metrics"
      @update-backend="setBackend"
    />

    <VueGridIsland :backend="backend" @metrics="setMetrics" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueControlsIsland from "./VueControlsIsland.vue";
import VueGridIsland from "./VueGridIsland.vue";

const backend = ref("bun");
const metrics = ref(null);

function setBackend(value) {
  backend.value = value;
}

function setMetrics(value) {
  metrics.value = value;
}
</script>

<style scoped>
.app-island-vue {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.grid-wrap {
  height: 700px;
}
</style>
