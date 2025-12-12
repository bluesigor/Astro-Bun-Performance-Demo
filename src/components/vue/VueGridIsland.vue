<script setup>
import { shallowRef, watch, computed } from "vue";
import { AgGridVue } from "ag-grid-vue3";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { TreeDataModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([ClientSideRowModelModule, TreeDataModule]);

const props = defineProps({
  backend: { type: String, required: true },
});

const emit = defineEmits(["metrics"]);

const API = {
  bun: import.meta.env.PUBLIC_API_BUN,
  node: import.meta.env.PUBLIC_API_NODE,
};

const modules = [ClientSideRowModelModule, TreeDataModule];

const rowData = shallowRef([]);

const defaultColDef = { flex: 1 };

const autoGroupColumnDef = {
  headerName: "Manufacturing Structure",
  minWidth: 300,
  cellRendererParams: { suppressCount: true },
};

const columnDefs = [
  { field: "part_number", headerName: "Part Number" },
  { field: "status" },
  { field: "quantity", aggFunc: "sum" },
  {
    field: "cost",
    aggFunc: "sum",
    valueFormatter: (p) => `${Number(p.value ?? 0).toFixed(2)} €`,
  },
  { field: "supplier" },
  { field: "created" },
];

const getDataPath = (d) => d.path;

watch(
  () => props.backend,
  async (backend) => {
    const res = await fetch(API[backend]);

    emit("metrics", {
      query: res.headers.get("x-query-time"),
      cold: res.headers.get("x-cold-start"),
      runtime: res.headers.get("x-runtime"),
    });

    rowData.value = await res.json();
  },
  { immediate: true }
);
</script>

<template>
  <div class="grid-wrap ag-theme-alpine">
    <AgGridVue
      :modules="modules"
      theme="legacy"
      :row-data="rowData"
      :column-defs="columnDefs"
      :default-col-def="defaultColDef"
      :auto-group-column-def="autoGroupColumnDef"
      :tree-data="true"
      :group-default-expanded="-1"
      :get-data-path="getDataPath"
      class="grid"
    />
  </div>
</template>

<style scoped>
.grid-wrap {
  width: 100%;
}

.grid {
  height: 700px;
  width: 100%;
}
</style>
