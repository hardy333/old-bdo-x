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

import d from "../assets/ALL_ORDERS_PARENT_MOCK_DATA .json";
import { allOrdersParentColumns } from "../utils/columnsDefs";
import { useNavigate } from "react-router-dom";
import useRemoveId from "../components/useRemoveId";
import exportData from "../utils/exportData";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";

const AllOrdersParent = () => {
  const [pageSize, setPageSize] = useState(15);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [headerList, setHeaderList] = useState(
    allOrdersParentColumns.map((obj) => ({ name: obj.name, isShowing: true }))
  );
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState(d);

  const gridRef = useRef(null);

  const [columnDefs] = useState(
    allOrdersParentColumns.map((obj) => {
      if (obj.name === "Shop #") {
        return {
          field: obj.name,
          cellRenderer: (params) => {
            const { value } = params;
            return "SPAR" + String(value).padStart(3, "0");
          },
        };
      }

      if (obj.name === "Vendors") {
        const vendors = [
          "Orbita",
          "Kant",
          "Diplomat",
          "Vest Inv.",
          "Magako",
          "GDM",
          "Svaneti",
        ];

        return {
          field: obj.name,
          cellRenderer: (params) => {
            return vendors[Math.floor(Math.random() * vendors.length)];
          },
        };
      }

      if (obj.name === "Amount") {
        return {
          field: obj.name,
          cellRenderer: (params) => {
            const { value } = params;
            return value + " GEL";
          },
        };
      }

      if (obj.name === "Status") {
        return {
          field: obj.name,
          // cellRenderer: (params) => {
          //   const { value } = params;
          //   if (value % 3 === 0) {
          //     return "Pending";
          //   } else if (value % 3 === 1) {
          //     return "In Progress";
          //   } else {
          //     return "Delivered";
          //   }
          // },
          minWidth: 250,

          cellRenderer: (params) => {
            const { value } = params;
            let res = "";
            let color = "";
            if (value % 3 === 0) {
              res = "Pending";
            } else if (value % 3 === 1) {
              res = "In Progress";
            } else {
              res = "Delivered";
            }

            if (params.value % 3 === 0) {
              color = "#FFC23C";
            } else if (params.value % 3 === 1) {
              color = "#6E0FF5";
            } else {
              color = "#01C6B5";
            }

            return (
              <>
                <span
                  className="ag-cell-status-value"
                  style={{ pointerEvents: "none", color }}
                >
                  {res}
                </span>
                <div
                  className="status-container"
                  style={{ pointerEvents: "none" }}
                >
                  <ul>
                    <li style={{ color }}>{res}</li>
                    <li>Something 11:06, 2/10/2023</li>
                    <li>Received 11:06, 2/10/2023</li>
                    <li>Sent 11:06, 2/10/2023</li>
                  </ul>
                </div>
              </>
            );
          },

          cellStyle: (params) => {
            if (params.value % 3 === 0) {
              return {
                color: "#FFC23C",
              };
            } else if (params.value % 3 === 1) {
              return {
                color: "#6E0FF5",
              };
            } else {
              return {
                color: "#01C6B5",
              };
            }
          },
        };
      }

      return {
        field: obj.name,
      };
    })
  );

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
  const [openedRowId, setOpenedRowId] = useState(null);

  useEffect(() => {
    const x = document.querySelector(
      ".all-orders-parent .ag-center-cols-container"
    );

    if (!x) return;

    const handleGridClick = (e) => {
      const cell = e.target;
      const row = cell.closest(".ag-row");

      const colName = cell.getAttribute("col-id");
      const rowId = +row.getAttribute("row-id");

      if (colName !== "Status") {
        //  for navigation
        const shop = row.querySelector(".ag-cell[col-id='Shop #']").innerText;
        const date = row.querySelector(".ag-cell[col-id='Date']").innerText;
        const status = row.querySelector(".ag-cell[col-id='Status']").innerText;
        const vendor = row.querySelector(
          ".ag-cell[col-id='Vendors']"
        ).innerText;
        const shopAddress = row.querySelector(
          ".ag-cell[col-id='Shop Address']"
        ).innerText;

        navigate(
          `/order-details?shop=${shop}&date=${date}&vendor=${vendor}&shopAddress=${shopAddress}&status=${status}`
        );
      }

      const prevOpenedCell = document.querySelector(
        ".all-orders-parent .ag-cell--opened"
      );

      if (prevOpenedCell) {
        prevOpenedCell.classList.remove("ag-cell--opened");
      }

      if (prevOpenedCell !== cell) {
        cell.classList.add("ag-cell--opened");
      }

      setOpenedRowId((currOpenedRowId) => {
        if (currOpenedRowId === rowId) {
          return null;
        } else {
          return rowId;
        }
      });
    };

    x.addEventListener("click", handleGridClick);

    return () => {
      x.removeEventListener("click", handleGridClick);
    };
  }, [gridApi, gridRef]);

  useEffect(() => {
    if (!gridRef.current) return;
    if (!gridApi) return;
    gridRef.current.api.resetRowHeights();
  }, [openedRowId, gridRef, gridApi]);

  const navigate = useNavigate();
  useRemoveId(gridApi, gridRef);

  function getRowHeight(params) {
    const { id } = params.node;
    if (id == openedRowId) {
      return 140;
    }

    if (rowHeightIndex === 0) {
      return 25;
    } else if (rowHeightIndex === 1) {
      return 32;
    } else if (rowHeightIndex === 2) {
      return 37;
    }
  }

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
            <span>All Orders</span>
            {/* <span style={{ color: "#6E0FF5" }}>GDM</span> */}
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
      <div
        id="marlin-table"
        className="ag-theme-alpine ag-grid-example all-orders-parent"
        style={{ minHeight: 595, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          getRowHeight={getRowHeight}
          onGridReady={onGridReady}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          components={components}
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
    </>
  );
};

export default AllOrdersParent;
