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
import "../styles/order-details.css";
import "../styles/pending-status-menu.css";

import triangleRed from "../assets/triangle-red.svg";
import triangleGreen from "../assets/triangle-green.svg";

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];
import "../styles/catalogue.css";

import Select from "react-select";

import { items1 } from "./Test";

// css
import "../styles/ag-grid.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import CustomHeaderCell from "../components/CustomHeaderCell";
import CustomInput from "../components/CustomInput";

import d from "../assets/CATALOGUE_MOCK_DATA.json";
import ReverseExpandSvg from "../components/ReverseExpandSvg";
import ExpandSvg from "../components/ExpandSvg";
import RowHeightSmallSvg from "../components/RowHeightSmallSvg";
import RowHeightMediumSvg from "../components/RowHeightMediumSvg";
import RowHeightBigSvg from "../components/RowHeightBigSvg";
import ExpandingInput from "../components/ExpandingInput";

import useFilterToggle from "../hooks/useFilterToggle";
import fetch_XLSX_DATA2 from "../utils/getData2";
import AgTablePag from "../components/AgTablePag";
import CatalogueMenu from "../components/CatalogueMenu";
import vendorsArr from "../data/vendors-data";
import ItemsMenu from "../components/ItemsMenu";
import DatePickerBtn from "../components/DatePickerBtn";
import { addDays } from "date-fns";
import useRemoveId from "../components/useRemoveId";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";

const SlaCategory = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState([
    {
      name: "Barcode",
      isShowing: true,
    },
    {
      name: "Product",
      isShowing: true,
    },
    {
      name: "Units",
      isShowing: true,
    },
    {
      name: "Price",
      isShowing: true,
    },
    {
      name: "Last Order Price",
      isShowing: true,
    },
    {
      name: "Last Change Date",
      isShowing: true,
    },
    {
      name: "Status",
      isShowing: true,
    },
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d);

  const [columnDefs] = useState([
    {
      field: "Barcode",
      cellRenderer: (params) => {
        const { value } = params;
        const index = value.indexOf("-");
        return value.slice(0, index);
      },
    },
    {
      field: "Product",
      cellRenderer: (params) => {
        if (cat3) {
          return cat3[Math.floor(Math.random() * cat3.length)];
        }

        return params.value;
      },
    },
    {
      field: "Units",
    },
    {
      field: "Price",
      cellRenderer: (params) => {
        const { value } = params;
        return value + " " + "GEL";
      },
    },
    {
      field: "Last Order Price",
      cellRenderer: (params) => {
        const { value } = params;
        return (
          <div
            style={{ height: "100%", display: "flex" }}
            className="items-center  gap-4 pe-20"
          >
            <span style={{ width: "50px" }}>{value + " " + "GEL"}</span>
            <img
              style={{ width: 14, height: 14 }}
              src={
                +value % 2 === 0 && +value > 40 ? triangleRed : triangleGreen
              }
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "Last Change Date",
    },
    {
      field: "Status",
      cellRenderer: ({ value }) => {
        return (
          <div className="flex items-center" style={{ height: "100%" }}>
            <button
              style={{ color: +value % 2 === 0 ? "#01C6B5" : "#F55364" }}
              className=" flex items-center px-2 rounded-3xl capitalize text-white p-0 text h-[16px] "
            >
              {+value % 2 === 0 ? "active" : "inactive"}
            </button>
          </div>
        );
      },
    },
  ]);

  const [isGlobalFilterEmpty, setIsGlobalFilterEmpty] = useState(true);

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

  // Row Height logic
  // Row Height logic

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
  const gridRef = useRef(null);

  const options = [
    { value: "Snacks", label: "Snacks" },
    { value: "Frozen Goods", label: "Frozen Goods" },
    { value: "Ready Meals", label: "Ready Meals" },
    { value: "Sweets", label: "Sweets" },
    { value: "Ice Cream", label: "Ice Cream" },
    { value: "beverages", label: "Beverages" },
    { value: "Baked Goods", label: "Baked Goods" },
  ];

  const [showFilters, setShowFilters] = useFilterToggle();
  // --------//
  // --------//
  const [isHover, setIsHover] = useState(false);
  const [isSectionHover, setIsSectionHover] = useState(false);

  const c = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      return items1[Math.floor(Math.random() * items1.length)];
    });
  }, []);

  const disableHoverAsync = () => {
    setIsHover(false);
  };

  const [cat1, setCat1] = useState(null);
  const [cat2, setCat2] = useState(null);
  const [cat3, setCat3] = useState(null);
  const [count, setCount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch_XLSX_DATA2();
      let c1 = [];
      let c2 = [];
      let c3 = [];

      data.TDSheet.forEach((obj) => {
        c1.push(obj["კატეგორია"]);
        c2.push(obj["ქვეკატეგორია"]);
        c3.push(obj["პროდუქტი"]);
      });

      c1 = Array.from(new Set(c1));
      c2 = Array.from(new Set(c2));
      c3 = Array.from(new Set(c3));

      setCat1(c1);
      setCat2(c2);
      setCat3(c3);

      if (rowData) {
        setRowData(
          rowData.map((obj, index) => ({ ...obj, Product: c3[index] }))
        );
        setCount(count + 1);
      }

      setRowData(d.map((obj, index) => ({ ...obj, Product: c3[index] })));
    };

    fetchData();
  }, []);

  const [isChecked, setISChecked] = useState(false);

  const [gridReady, setGridReady] = useState(false);
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 5),
      key: "selection",
      color: "#6E0FF5",
    },
  ]);

  useRemoveId(gridApi, gridRef);

  return (
    <>
      <header className="all-orders__header catalogue-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4>Service Level Report</h4>
            <Select
              className="react-select-container sla-select"
              classNamePrefix="react-select"
              options={vendorsArr}
              defaultValue={{ value: "GDM", label: "GDM" }}
            />
            <ItemsMenu category={true} isSlaVendors={true} />
            <DatePickerBtn dateState={dateState} setDateState={setDateState} />
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
              <svg
                id="Layer_3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.28 33.65"
              >
                <defs></defs>
                <path
                  className="cls-1"
                  d="m44.44,5.68H2.84c-1.57,0-2.84-1.27-2.84-2.84S1.27,0,2.84,0h41.61c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
                <path
                  className="cls-1"
                  d="m37.34,19.66H9.94c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84h27.4c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
                <path
                  className="cls-1"
                  d="m30.24,33.65h-13.2c-1.57,0-2.84-1.27-2.84-2.84s1.27-2.84,2.84-2.84h13.2c1.57,0,2.84,1.27,2.84,2.84s-1.27,2.84-2.84,2.84Z"
                />
              </svg>
            </button>
            {/* popup */}
            <Menu
              align="center"
              direction="top"
              menuButton={
                <MenuButton className="all-orders__btn ">
                  <svg
                    id="Layer_3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 33.58 47.28"
                  >
                    <defs></defs>
                    <path
                      className="cls-1"
                      d="m27.9,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                    <path
                      className="cls-1"
                      d="m13.95,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                    <path
                      className="cls-1"
                      d="m0,44.44V2.84C0,1.27,1.27,0,2.84,0s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
                    />
                  </svg>
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
                active: isFullScreen,
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
      <div className="flex gap-2">
        {/* Categories */}
        <div className="catalogue-menu-container">
          <CatalogueMenu />
        </div>
        <div
          id="marlin-table"
          className="ag-theme-alpine ag-grid-example"
          style={{ minHeight: 595, width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            components={components}
            getRowHeight={() => {
              if (rowHeightIndex === 0) {
                return 25;
              } else if (rowHeightIndex === 1) {
                return 32;
              } else if (rowHeightIndex === 2) {
                return 37;
              }
            }}
            paginationPageSize={pageSize}
          ></AgGridReact>

          {gridReady === true && (
            <AgTablePag
              gridRef={gridRef}
              pageCount={Math.ceil(92 / pageSize)}
            />
          )}

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

export default SlaCategory;
