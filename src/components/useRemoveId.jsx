import { useEffect } from "react";

const useRemoveId = (gridApi, gridRef) => {
  useEffect(() => {
    if (!gridApi || !gridRef.current) return;
    const tableDiv = document.querySelector(".ag-theme-alpine");
    tableDiv.removeAttribute("id");
  }, [gridApi, gridRef]);
};

export default useRemoveId;
