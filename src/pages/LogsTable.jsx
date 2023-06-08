import React, { useMemo, useRef, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/ag-table-scrollbar.css";

// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import ExpandingInput from "../components/ExpandingInput";

import "../styles/logs.css";

import d from "../assets/LOGS_MOCK_DATA.json";
import useFilterToggle from "../hooks/useFilterToggle";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";

const LogsTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(d);
  const gridRef = useRef(null);

  const [columnDefs] = useState([
    {
      field: "Transition ID",
    },
    {
      field: "Date",
    },
    {
      field: "Sender",
    },
    {
      field: "Receiver",
    },
    {
      field: "Document #",
    },
    {
      field: "Type",
      minWidth: 150,
    },
    {
      field: "Error Code",
      cellRendererFramework: (params) => {
        return (
          <div className="  logs-btn flex gap-10 justify-start p-2  ">
            <button
              style={{ height: 23, width: 23 }}
              className={`p-2 border-2  border-none flex justify-center items-center rounded-lg ${
                +params.value % 2 === 0 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {+params.value % 2 === 0 ? "E" : "S"}
            </button>
            <span>{params.value}</span>
          </div>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      floatingFilter: false,
      suppressMovable: true,
      floatingFilterComponent: CustomInput,
    }),
    []
  );

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    console.log(2121);

    gridApi.setQuickFilter(e.target.value);
  };

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  useFilterToggle();

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10, cursor: "default" }}
          >
            <span>Logs</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <ExpandingInput onFilterTextChange={onFilterTextChange} />
            <button
              className="all-orders__btn excel-export-btn"
              onClick={() => exportData(rowData)}
            >
              <ExcelExportSvg />
            </button>
          </div>
        </div>
      </header>
      <div
        className="ag-theme-alpine ag-grid-example"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
          paginationPageSize={pageSize}
          rowHeight={32}
        ></AgGridReact>

        <Menu
          className="page-size-menu"
          align="end"
          menuButton={
            <MenuButton className="page-size-btn">
              <span>Rows per page</span>
              <span className="btn">{pageSize}</span>
            </MenuButton>
          }
          transition
        >
          {pageSizes.map((size) => {
            return (
              <MenuItem
                key={size}
                onClick={() => {
                  setPageSize(size);
                }}
                style={{ color: pageSize === size ? "#1A1F3D" : "" }}
              >
                {size}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </>
  );
};

export default LogsTable;
