import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReactPaginate from "react-paginate";
import { createPortal } from "react-dom";

const AgTablePag = ({ gridRef, pageCount }) => {
  const changePage = (event) => {
    gridRef.current.api.paginationGoToPage(event.selected);
  };

  useEffect(() => {
    const x = document.querySelector(".ag-paging-panel");
  }, []);

  if (document.querySelector(".ag-paging-panel")) {
    return createPortal(
      <div className="pag-container">
        <ReactPaginate
          breakLabel="..."
          previousLabel="&larr;"
          nextLabel="&rarr;"
          onPageChange={changePage}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
        />
      </div>,
      document.querySelector(".ag-paging-panel")
    );
  } else {
    return null;
  }
};

export default AgTablePag;
