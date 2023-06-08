import React, { useEffect, useMemo, useState } from "react";
import { COLUMNS_BY_ITEM, COLUMNS_BY_SHOP } from "../columns.js";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import "../styles/table.css";
import "../styles/tablePopup.css";
import cross from "../assets/icons/cross.png";
import check from "../assets/icons/check.png";
import dots from "../assets/all-orders/dots.svg";

import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import TablePagination from "./TablePagination.jsx";

import arrow from "../assets/icons/arrow-sort.png";
import smallArrow from "../assets/icons/left-arrow.png";

import classNames from "classnames";
import useOutsidePopupClick from "../hooks/useOutsidePopupClick.jsx";
import { TableSettingsContext } from "../context/TableSettingsContext.jsx";
import { useContext } from "react";

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Switch } from "@mui/material";

const OrdersTable = ({
  tableData,
  type = "By item",
  option = "All",
  searchValue = "",
  isSorting = false,
  setAvgSLA,
  showInputs = false,
  paddingSizesIndex = 1,
  hiddenHeadersList = [],
  arr,
}) => {
  const columns = useMemo(
    () => (type === "By shop" ? COLUMNS_BY_SHOP : COLUMNS_BY_ITEM),
    [type]
  );

  const data = useMemo(() => {
    return tableData.filter((product) => {
      if (option === "All") return true;

      if (type === "By item") {
        return product["Product Category"] === option;
      }

      if (type === "By shop") {
        return product["Address"] === option;
      }
    });
  }, [tableData, option]);

  const a = useContext(TableSettingsContext);

  const colArr = [];

  for (let key in hiddenHeadersList) {
    if (hiddenHeadersList[key]) {
      colArr.push(key);
    }
  }

  // console.log("c", colArr);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    setPageSize,
    gotoPage,
    pageCount,
    prepareRow,
    rows,
    ...x
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        hiddenColumns: arr,
      },
      disableSortBy: !isSorting,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue]);

  useOutsidePopupClick();

  return (
    <>
      <div className="table-wrapper">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    style={{
                      pointerEvents: !isSorting ? "none" : "",
                      paddingInline: paddingSizesIndex * 15,
                      paddingBlock: paddingSizesIndex * 2.5,
                    }}
                    {...column.getHeaderProps()}
                    onClick={(e) => {
                      document
                        .querySelector(".open-popup")
                        ?.classList.remove("open-popup");

                      e.currentTarget.classList.toggle("open-popup");
                    }}
                  >
                    {/* Dots */}
                    <Menu
                      align="center"
                      direction="bottom"
                      menuButton={
                        <MenuButton className="">
                          <img src={dots} className="th-dots" alt="" />
                        </MenuButton>
                      }
                      transition
                    >
                      {[1, 2, 3].map((header) => (
                        <MenuItem
                          key={header}
                          value={header}
                          onClick={(e) => {
                            e.keepOpen = true;
                          }}
                        >
                          <Switch defaultChecked />
                          {header}
                        </MenuItem>
                      ))}
                    </Menu>

                    <img
                      src={arrow}
                      width={13}
                      className={classNames({
                        hide: !isSorting || !column.canSort,
                        sorted: column.isSorted,
                        desc: column.isSortedDesc,
                        sortImg: true,
                      })}
                    />
                    <a
                      data-tooltip-id={column.render("Header")}
                      data-tooltip-place="bottom"
                      data-tooltip-content={column.render("Header")}
                    >
                      {column.render("Header")}
                    </a>
                    <Tooltip id={column.render("Header")} />
                    <br />
                    <span
                      className={classNames({
                        "table-input-wrapper": true,
                        "table-input-wrapper-show": showInputs,
                      })}
                      style={{ cursor: !column.canFilter && "default" }}
                    >
                      {column.canFilter && (
                        <input
                          type="text"
                          value={column.filterValue || ""}
                          onChange={(e) => column.setFilter(e.target.value)}
                          className={classNames({})}
                          placeholder="Filter By code"
                          style={{
                            borderBottom: "1px solid rgba(33, 21, 67, 0.13)",
                            borderRadius: 0,
                            paddingLeft: 0,
                            fontSize: "14px",
                            boxShadow: "0 0 0 rgba(0, 0,0, 0.2)",
                            maxWidth: "100%",
                          }}
                        />
                      )}
                    </span>

                    <div
                      className={classNames({
                        hide: !isSorting || !column.canSort,
                        sortPopup: true,
                      })}
                    >
                      <div
                        className={classNames({
                          active: column.isSortedDesc && column.isSorted,
                          "th-popup-col": true,
                        })}
                        onClick={() => column.toggleSortBy(true)}
                      >
                        {column.Header === "In Time" ? (
                          <>
                            In time
                            <img className="img-in-time" src={check} />
                          </>
                        ) : (
                          <>
                            Largest
                            <img src={smallArrow} />
                          </>
                        )}
                      </div>
                      <div
                        className={classNames({
                          active: !column.isSortedDesc && column.isSorted,
                          "th-popup-col": true,
                        })}
                        onClick={() => column.toggleSortBy(false)}
                      >
                        {column.Header === "In Time" ? (
                          <>
                            Late
                            <img className="img-in-time" src={cross} />
                          </>
                        ) : (
                          <>
                            Smallest
                            <img src={smallArrow} />
                          </>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    let td = cell.render("Cell");

                    // In service level
                    if (cell.column.Header === "Service Level") {
                      td = Math.round(Number(cell.value) * 100) + "%";
                    }

                    // Amount
                    if (cell.column.Header === "Amount") {
                      td = cell.value + " GEL";
                    }

                    // In time
                    if (cell.column.Header === "In Time") {
                      td =
                        cell.value === "No" ? (
                          <img src={cross} />
                        ) : (
                          <img src={check} />
                        );
                    }
                    const tootlitlabel = cell.value;

                    let renderTdItem;

                    if (cell.value.length > 15) {
                      renderTdItem = (
                        <>
                          <a
                            data-tooltip-id={tootlitlabel}
                            data-tooltip-content={tootlitlabel}
                            data-tooltip-variant="dark"
                            data-tooltip-place="bottom"
                          >
                            {td}
                          </a>
                          <Tooltip id={tootlitlabel} />
                        </>
                      );
                    } else {
                      renderTdItem = td;
                    }

                    return (
                      <td
                        style={{
                          paddingInline: paddingSizesIndex * 15,
                          paddingBlock: paddingSizesIndex * 4,
                        }}
                        {...cell.getCellProps()}
                      >
                        {renderTdItem}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TablePagination
        pageSize={pageSize}
        setPageSize={setPageSize}
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageOptions={pageOptions}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </>
  );
};

export default OrdersTable;
