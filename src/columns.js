import ExcelDateToJSDate from "./utils/transformExcelDate";
import { format } from "date-fns";

export const COLUMNS_BY_ITEM = [
  {
    Header: "Number",
    accessor: "Number",
    show: false
  },
  {
    Header: "Item",
    accessor: "Item",
    disableSortBy: true,
    enableColumnFilter: false,
    enableColumnFilters: false,
    enableFilters: false,
    // disableFilters: true
  },
  {
    Header: "Ordered",
    accessor: "Ordered",
  },
  {
    Header: "Delivered",
    accessor: "Delivered",
  },
  {
    Header: "In Time",
    accessor: "In time",
  },
  {
    Header: "Service Level",
    accessor: "Service level",
  },
  {
    Header: "Product Category",
    accessor: "Product Category",
  },
];

export const COLUMNS_BY_SHOP = [
  {
    Header: "Number",
    accessor: "Number",
  },
  {
    Header: "Date",
    accessor: "Date",
    disableGlobalFilter: true,
    // disableFilters: true,
    Cell: ({ value }) => {
      return format(ExcelDateToJSDate(value), "M/dd/yyyy");
    },
  },
  {
    Header: "Amount",
    accessor: "Amount",
    disableGlobalFilter: true,
    // disableFilters: true

  },
  {
    Header: "Ordered",
    accessor: "Ordered",
  },
  {
    Header: "Delivered",
    accessor: "Delivered",
  },
  {
    Header: "In Time",
    accessor: "In time",
  },
  {
    Header: "Service Level",
    accessor: "Service level",
  },
  {
    Header: "Address",
    accessor: "Address",
  },
];
