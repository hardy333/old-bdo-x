function ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

export default ExcelDateToJSDate;
