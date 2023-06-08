import classNames from "classnames";
import React from "react";
import "../styles/pagination.css";
import Select from "react-select";

const TablePagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
}) => {
  const pageSizeOptions = [10, 15, 20, 25, 30, 50, 100].map((pageSize) => ({
    value: pageSize,
    label: pageSize,
  }));

  return (
    <div className="pagination-wrapper" style={{ paddingLeft: "50px" }}>
      <button
        style={{ marginLeft: "auto" }}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      {pageOptions.map((index) => (
        <button
          key={index}
          onClick={() => gotoPage(index)}
          className={classNames({ active: index === pageIndex })}
        >
          {index}
        </button>
      ))}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </button>{" "}
      <div
        className="pagination-options-container"
        style={{ display: "flex", marginLeft: "auto", alignItems: "center" }}
      >
        {/* <select name="tablePageSize" id="tablePageSize">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> */}

        <div style={{ marginRight: "10px" }}>
          <span>Go to page</span>
          <input
            placeholder="0"
            style={{ width: "30px", height: "30px", marginLeft: "10px" }}
            type="text"
            className="input"
            onChange={(e) => gotoPage(+e.target.value)}
          />
        </div>

        <Select
          id="pageSize"
          name="pageSize"
          value={{ value: pageSize, label: pageSize }}
          options={pageSizeOptions}
          menuPlacement="top"
          onChange={(value) => {
            console.log(value);
            setPageSize(+value.value);
          }}
        />
      </div>
    </div>
  );
};

export default TablePagination;
