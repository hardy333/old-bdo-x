import { allOrdersParentColumns } from "../utils/columnsDefs";

const vendorAllOrdersColDefs = allOrdersParentColumns.map((obj) => {
  if (obj.name === "Date") {
    return {
      field: obj.name,
      hide: true,
      cellRenderer: (params) => {
        const { value } = params;
        return value;
      },
    };
  }
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
      isShowing: false,
      hide: true,
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
            <div className="status-container" style={{ pointerEvents: "none" }}>
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
        return {
          display: "flex",
          alignItems: "center",
        };
      },
    };
  }

  return {
    field: obj.name,
  };
});

export default vendorAllOrdersColDefs;
