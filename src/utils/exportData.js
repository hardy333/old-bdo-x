import xlsExport from "xlsexport";

const exportData = (data) => {
  const xls = new xlsExport(data);
  xls.exportToXLS("all-orders-gdm.xls");
};

export default exportData;
