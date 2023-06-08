import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import CustomInput from "../components/CustomInput";
import testTableColumnDefs from "../testTableColumnDefs";
import fetch_XLSX_DATA from "../utils/getData";
import useFilterToggle from "../hooks/useFilterToggle";

const TableTest = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);
  const [columnDefs] = useState(testTableColumnDefs);
  const [rowData, setRowData] = useState(null);

  const [showFilters, setShowFilters] = useFilterToggle();

  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      suppressMovable: true,

      floatingFilterComponent: CustomInput,
    }),
    []
  );

  return (
    <>
      <button
        className="w-[100px] bg-red-500 rounded-lg text-white mb-2"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "hide" : "show"}
      </button>
      <div
        className="ag-theme-alpine ag-grid-example"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          getRowHeight={() => {
            return 32;
          }}
          rowData={rowData}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // components={components}
          pagination={true}
          paginationPageSize={15}
        ></AgGridReact>
      </div>
    </>
  );
};

export default TableTest;
