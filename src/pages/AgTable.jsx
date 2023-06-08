import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
import fetch_XLSX_DATA from "../utils/getData";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";
import ExpandingInput from "../components/ExpandingInput";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import ColumnHideSvg from "../components/ColumnHideSvg";
import FilterSvg from "../components/FilterSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import useFilterToggle from "../hooks/useFilterToggle";
import AgTablePag from "../components/AgTablePag";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";

const AgTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBigRow, setIsBigRow] = useState(true);

  const [headerList, setHeaderList] = useState([
    {
      name: "Number",
      isShowing: true,
    },
    {
      name: "Item",
      isShowing: true,
    },
    {
      name: "Ordered",
      isShowing: true,
    },
    {
      name: "Delivered",
      isShowing: true,
    },
    {
      name: "In time",
      isShowing: true,
    },
    {
      name: "Service Level",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);

  const gridRef = useRef(null);

  const [columnDefs] = useState([
    {
      field: "Number",
      // cellRendererFramework: (params) => {
      //   return <div>Hello</div>;
      // },
    },
    {
      field: "Item",
    },
    {
      field: "Ordered",
      cellStyle: (params) => ({ color: +params.value > 800 ? "" : "#F55364" }),
    },
    {
      field: "Delivered",
    },
    {
      field: "In time",
      cellStyle: (params) => {
        if (params.value === "Yes") {
          return {
            color: "#FFC23C",
            fontWeight: 600,
          };
        } else {
          return {
            color: "#6E0FF5",
            fontWeight: 600,
          };
        }
      },
    },
    {
      field: "Service level",
      minWidth: 150,
      // hide: true,
    },
  ]);
  const [showingFloatingFilter, setShowingFloatingFilter] = useState(true);

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch_XLSX_DATA();

      setRowData(data["By item"]);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isFullScreen) {
      document.body.classList.add("dashboard-main-fullscreen");
    } else {
      document.body.classList.remove("dashboard-main-fullscreen");
    }
  }, [isFullScreen]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
      floatingFilter: true,
      suppressMovable: true,
      // floatingFilterComponent: (params) => {

      //   return <input style={{ width: "100%" }} placeholder="Search in table" />;
      // },
      floatingFilterComponent: CustomInput,
      // CustomColumnFilter: CustomColumnFilter,
    }),
    []
  );

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridRef.current.api.resetRowHeights();
    setGridReady(true);
  };

  const onFilterTextChange = (e) => {
    if (e.target.value === "") {
      setIsGlobalFilterEmpty(true);
    } else {
      setIsGlobalFilterEmpty(false);
    }

    gridApi.setQuickFilter(e.target.value);
  };

  const toggleColumn = (name) => {
    const newHeaderList = headerList.map((header) =>
      header.name !== name
        ? header
        : { ...header, isShowing: !header.isShowing }
    );
    const currHeader = headerList.find((header) => header.name === name);
    setHeaderList(newHeaderList);
    gridColumnApi.setColumnVisible(name, !currHeader.isShowing);
  };

  const hideAllColumns = () => {
    setHeaderList(
      headerList.map((header) => ({ ...header, isShowing: false }))
    );
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, false);
    });
  };

  const showAllColumns = () => {
    setHeaderList(headerList.map((header) => ({ ...header, isShowing: true })));
    headerList.forEach((header) => {
      gridColumnApi.setColumnVisible(header.name, true);
    });
  };

  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeaderCell,
    };
  }, []);

  // const sortByAthleteDesc = () => {
  //   gridColumnApi.applyColumnState({
  //     state: [{ colId: "Number", sort: "desc" }],
  //     defaultState: { sort: null },
  //   });
  // };

  const rowHeightBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      rowHeightBtnRef.current.click();
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const [rowHeightsArr, setRowHeightsArr] = ["small", "medium", "big"];
  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };

  const [showFilters, setShowFilters] = useFilterToggle();

  const [gridReady, setGridReady] = useState(false);

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__arrow-container"></div>
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="all-orders__gdm-container"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <span>All Orders:</span>
            <span style={{ color: "#6E0FF5" }}>GDM</span>
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <ExpandingInput onFilterTextChange={onFilterTextChange} />
            {/* input filter */}
            <button
              // ref={filterButtonRef}
              onClick={() => {
                setShowFilters(!showFilters);
              }}
              className={classNames({
                "all-orders__btn-filter": true,
                "all-orders__btn": true,
                active: showFilters,
              })}
            >
              <FilterSvg />
            </button>

            {/* popup */}
            <Menu
              align="center"
              direction="top"
              menuButton={
                <MenuButton className="all-orders__btn ">
                  <ColumnHideSvg />
                </MenuButton>
              }
              transition
            >
              <div className="column-toggle-popup">
                <header className="column-toggle-popup__header">
                  <button
                    className={classNames({
                      btn: true,
                      active: !headerList.every((header) => !header.isShowing),
                    })}
                    onClick={hideAllColumns}
                  >
                    Hide All
                  </button>
                  <button
                    className={classNames({
                      btn: true,
                      active: headerList.some((header) => !header.isShowing),
                    })}
                    onClick={showAllColumns}
                  >
                    Show All
                  </button>
                </header>
                {headerList.map((header) => (
                  <MenuItem
                    key={header.name}
                    value={header.name}
                    onClick={(e) => {
                      // Stop the `onItemClick` of root menu component from firing
                      // e.stopPropagation = true;
                      // Keep the menu open after this menu item is clicked
                      e.keepOpen = true;
                    }}
                  >
                    <div className="switch">
                      <input
                        checked={header.isShowing}
                        type="checkbox"
                        id={header.name}
                        className="switch__input"
                        onChange={() => {
                          toggleColumn(header.name);
                        }}
                      />
                      <label htmlFor={header.name} className="switch__label">
                        {header.name}
                      </label>
                    </div>
                  </MenuItem>
                ))}
              </div>
            </Menu>
            {/* Row height */}
            <button
              onClick={() => {
                gridRef.current.api.resetRowHeights();
                changeRowHeight();
              }}
              ref={rowHeightBtnRef}
              className="all-orders__btn"
            >
              {rowHeightIndex === 1 ? <RowHeightSmallSvg /> : null}
              {rowHeightIndex === 2 ? <RowHeightMediumSvg /> : null}
              {rowHeightIndex === 0 ? <RowHeightBigSvg /> : null}
            </button>
            {/* expand */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={classNames({
                "all-orders__btn": true,
              })}
            >
              {isFullScreen ? <ReverseExpandSvg /> : <ExpandSvg />}
            </button>
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
          getRowHeight={() => {
            if (rowHeightIndex === 0) {
              return 25;
            } else if (rowHeightIndex === 1) {
              return 32;
            } else if (rowHeightIndex === 2) {
              return 37;
            }
          }}
          // rowStyle={{ maxHeight: "20px", height: "10px" }}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
          // enableRangeSelection={true}
          // copyHeadersToClipboard={true}
          // rowSelection={"multiple"}
          // paginationAutoPageSize={true}
          paginationPageSize={pageSize}
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
        {gridReady === true && <AgTablePag gridRef={gridRef} pageCount={4} />}
      </div>
    </>
  );
};

export default AgTable;
