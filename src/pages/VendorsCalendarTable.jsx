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

import "../styles/all-orders-parent.css";
import "../styles/vendors-calendar.css";

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];

// css
import "../styles/ag-grid.css";
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

import d1 from "../assets/vendors-calendar-1.json";
import d2 from "../assets/vendors-calendar-2.json";
import VendorsDateRange from "../components/VendorsDateRange";

import Select from "react-select";
import { DayPicker } from "react-day-picker";
import useRemoveId from "../components/useRemoveId";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";

const vendors = [
  "Orbita",
  "Kant",
  "Diplomat",
  "Vest Inv.",
  "Magako",
  "GDM",
  "Svaneti",
];

const options = [
  { value: "Orbita", label: "Orbita" },
  { value: "Kant", label: "Kant" },
  { value: "Ready Meals", label: "Ready Meals" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Vest Inv", label: "Vest Inv." },
  { value: "Magako", label: "Magako" },
  { value: "Svaneti", label: "Svaneti" },
];

const VendorsCalendarTable = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "Shop",
      isShowing: true,
    },
    {
      name: "Shop Address",
      isShowing: true,
    },
    {
      name: "Vendor",
      isShowing: true,
    },
    {
      name: "Brand",
      isShowing: true,
    },
    {
      name: "Dis Date",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d1);

  const gridRef = useRef(null);

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const [columnDefs] = useState([
    {
      field: "Shop",
      width: 120,
      minWidth: 120,
      maxWidth: 130,
      cellRendererFramework: (params) => {
        return <div>Shop{String(params.value).padStart(3, "0")}</div>;
      },
    },
    {
      field: "Shop Address",
      maxWidth: 200,
    },
    {
      field: "Vendor",
      maxWidth: 180,
    },
    {
      field: "Brand",
      maxWidth: 180,
    },
    {
      field: "Distributor's Date",
      cellRendererFramework: (params) => {
        const d1 = Math.floor(Math.random() * 6);
        const d2 = Math.floor(Math.random() * 6);
        return (
          <div className="dis-date-container">
            <div className="days-container">
              {days.map((d, index) => (
                <span
                  key={d}
                  style={{
                    color: d1 === index || d2 == index ? "#211543" : "#AE9EDC",
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
            <div className="circle-container">
              <span
                style={{ display: Math.random() - 0.5 > 0 ? "none" : "" }}
                className={`circle ${Math.random() - 0.5 > 0 ? "active" : ""}`}
              ></span>
              <span
                className={`circle ${Math.random() - 0.5 > 0 ? "active" : ""}`}
              ></span>
            </div>
          </div>
        );
      },
    },
  ]);

  const [rowDataLabel, setRowDataLabel] = useState("d1");

  const changeRowData = () => {
    if (rowDataLabel === "d1") {
      setRowData(d2);
      setRowDataLabel("d2");
    } else {
      setRowData(d1);
      setRowDataLabel("d1");
    }
  };

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
      floatingFilterComponent: CustomInput,
    }),
    []
  );
  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

  // EVents
  // EVents
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    gridRef.current.api.resetRowHeights();
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

  const rowHeightBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      rowHeightBtnRef.current.click();
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const [rowHeightIndex, setRowHeightIndex] = useState(1);

  const changeRowHeight = () => {
    if (rowHeightIndex === 2) {
      setRowHeightIndex(0);
    } else {
      setRowHeightIndex((c) => c + 1);
    }
  };
  const [showFilters, setShowFilters] = useFilterToggle();
  const [selected, setSelected] = useState(new Date());

  useRemoveId(gridApi, gridRef);

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
            <span className="me-8">Vendors Calendar</span>
            {/* <span style={{ color: "#6E0FF5" }}>GDM</span> */}
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              defaultValue={{ value: "GDM", label: "GDM" }}
              onChange={() => {
                console.log("Select changes");
                changeRowData();
              }}
            />
          </div>
          {/* Right */}
          <div className="all-orders__settings__options">
            <ExpandingInput onFilterTextChange={onFilterTextChange} />
            {/* input filter */}
            <button
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
      {/* ..... */}
      <div className="flex gap-2">
        <div className="vendors-calendar__left">
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima eum,
          praesentium natus repellat nulla illo inventore, nisi suscipit,
          aliquam aspernatur ducimus quia tempore sunt voluptates recusandae
          veniam eius illum reprehenderit! */}
          {/* <VendorsDateRange changeRowData={changeRowData} /> */}
          <div className=" date-picker-wrapper">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(x) => {
                setSelected(x);
                changeRowData();
              }}
            />
          </div>
        </div>

        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example "
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
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            components={components}
            paginationPageSize={pageSize}
            suppressHorizontalScroll={true}
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
      </div>
    </>
  );
};

export default VendorsCalendarTable;
