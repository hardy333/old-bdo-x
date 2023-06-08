import React, { useEffect, useMemo, useRef, useState } from "react";
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

import classNames from "classnames";

const pageSizes = [5, 10, 15, 20, 25, 30];
import "../styles/catalogue.css";

import { items1, parentCategories } from "./Test";

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
import SearchSvg from "../components/svgs/SearchSvg";

const CatalogueTable5Level = () => {
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

  const [rowData, setRowData] = useState(null);

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
              style={{ background: +value % 2 === 0 ? "#01C6B5" : "#F55364" }}
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
    async function fetchData() {
      // const data = await fetch_XLSX_DATA();
      d.splice(10, 2);

      setRowData(d);
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

  const [rowHeightsArr, setRowHeightsArr] = ["small", "medium", "big"];
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

  const [isChecked, setISChecked] = useState(false);

  // section 3
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <header className="all-orders__header catalogue-header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4>Catalogue</h4>

            <div className="vendors-switch-container">
              <p className="catalogue-label">My products</p>
              <div className="toggle-switch">
                <input
                  className="toggle-input"
                  checked={isChecked}
                  onChange={() => setISChecked(!isChecked)}
                  id="toggle"
                  type="checkbox"
                />
                <label className="toggle-label" htmlFor="toggle"></label>
              </div>
              <p className="catalogue-label">All Products</p>
            </div>

            {/* <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              defaultValue={{ value: "vanilla", label: "Vanilla" }}
            /> */}
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
          </div>
        </div>
      </header>
      <div className="flex gap-2">
        <div className="categories categories--5">
          <section className="section-first">
            <header className="categories__header">
              <div className="input-wrapper">
                <input type="text" className="input" />
                <SearchSvg />
              </div>
            </header>
            <div className="categories__list-container">
              <ul className="categories__list">
                {c.map((item, index) => (
                  <li
                    key={index}
                    onMouseLeave={disableHoverAsync}
                    onMouseOver={() => setIsHover(true)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="categories__footer">
              <p>View full structure </p>
            </div>
          </section>

          <section
            className={classNames({
              "section-2": true,
              open: isHover || isSectionHover,
            })}
            onMouseLeave={() => setIsSectionHover(false)}
            onMouseOver={() => setIsSectionHover(true)}
          >
            <header>
              <div className="input-wrapper">
                <input type="text" className="input" />
                <SearchSvg />
              </div>
            </header>
            <div className={`section-2__container ${isHover ? "open" : ""}`}>
              <div className="section-2__list-container">
                {[
                  ...parentCategories,
                  ...parentCategories,
                  ...parentCategories,
                  ...parentCategories,
                ].map((parentCat, i) => {
                  return (
                    <ul key={i}>
                      <li className="parent-li">{parentCat}</li>
                      {Array.from({
                        length: Math.floor(Math.random() * 5 + 7),
                      }).map((_, index) => {
                        const item =
                          items1[Math.floor(Math.random() * items1.length)];
                        return (
                          <li
                            key={index}
                            onClick={(e) => {
                              setSelectedItem(item);
                            }}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>

            <section
              className={classNames({
                "section-2": true,
                "section-3 open": true,
                open: selectedItem,
              })}
              onMouseOver={() => setIsSectionHover((c) => true)}
            >
              <header>
                <div className="input-wrapper">
                  <input type="text" className="input" />
                  <SearchSvg />
                </div>
              </header>

              <div className={`section-2__container `}>
                <ul className="section-3__list">
                  {items1.map((item, index) => (
                    <li key={index} onClick={() => setIsHover(false)}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </section>
        </div>
        <div
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
        </div>
      </div>
    </>
  );
};

export default CatalogueTable5Level;
