import { useEffect, useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry, ClientSideRowModelModule } from "ag-grid-community";
import { TreeDataModule } from "ag-grid-enterprise";

ModuleRegistry.registerModules([ClientSideRowModelModule, TreeDataModule]);

const API = {
  bun: import.meta.env.PUBLIC_API_BUN,
  node: import.meta.env.PUBLIC_API_NODE,
};

export default function GridIsland({ backend, onMetrics }) {
  const [rowData, setRowData] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await fetch(API[backend]);

    const metrics = {
      query: res.headers.get("x-query-time"),
      cold: res.headers.get("x-cold-start"),
      runtime: res.headers.get("x-runtime"),
    };

    onMetrics?.(metrics);
    setRowData(await res.json());
  }, [backend, onMetrics]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const defaultColDef = useMemo(() => ({ flex: 1 }), []);

  const autoGroupColumnDef = useMemo(
    () => ({
      headerName: "Manufacturing Structure",
      minWidth: 300,
      cellRendererParams: { suppressCount: true },
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      { field: "part_number", headerName: "Part Number" },
      { field: "status" },
      { field: "quantity", aggFunc: "sum" },
      {
        field: "cost",
        aggFunc: "sum",
        valueFormatter: (p) => `${p.value.toFixed(2)} €`,
      },
      { field: "supplier" },
      { field: "created" },
    ],
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 700 }}>
      <AgGridReact
        theme="legacy"
        rowData={rowData}
        treeData
        getDataPath={(d) => d.path}
        groupDefaultExpanded={-1}
        autoGroupColumnDef={autoGroupColumnDef}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
      />
    </div>
  );
}
