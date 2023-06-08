import React, { useEffect, useMemo, useState } from "react";
import fetch_XLSX_DATA from "../utils/getData";
import { AgGridReact } from "ag-grid-react";

const SampleAg = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const [columnDefs] = useState([
    {
      field: "Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Item",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Ordered",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Delivered",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "In time",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "Service level",
      minWidth: 150,
      flex: 1,
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
  }));

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  return (
    <>
      <h2>Hello</h2>
      <div className="ag-grid-alpine">
        <AgGridReact
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={15}
        ></AgGridReact>
      </div>
    </>
  );
};

export default SampleAg;
