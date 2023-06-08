import React, { useState } from "react";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import HouseSvg from "./svgs/service-level-svgs/HouseSvg";
import ItemSvg from "./svgs/service-level-svgs/ItemSvg";
import CategorySvg from "./svgs/service-level-svgs/CategorySvg";
import BrandSvg from "./svgs/service-level-svgs/BrandSvg";
import RegionSvg from "./svgs/service-level-svgs/RegionSvg";
import arrowDown from "../assets/arrow-down.svg";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const itemsList = [
  {
    svg: <HouseSvg />,
    label: "Shop",
  },
  {
    svg: <ItemSvg />,
    label: "Item",
  },
  {
    svg: <CategorySvg />,
    label: "Category",
  },
  {
    svg: <BrandSvg />,
    label: "Brand",
  },
  {
    label: "Region",
    svg: <RegionSvg />,
  },
];

const ItemsMenu = ({ isSlaVendors = false, category = false }) => {
  const index = category ? 2 : 0;
  const [reportCategory, setReportCategory] = useState(itemsList[index]);
  const navigate = useNavigate();

  return (
    <div>
      <Menu
        className="report-child-menu"
        menuButton={({ open }) => (
          <button className={`report-child-menu-button ${open ? "open" : ""}`}>
            {reportCategory.svg} {reportCategory.label}
            <svg
              width="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="report-child-menu-arrow"
            >
              <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
            </svg>
          </button>
        )}
      >
        {itemsList.map((item) => {
          return (
            <MenuItem
              key={item.label}
              className={classNames({
                selected: reportCategory.label === item.label,
              })}
              onClick={() => {
                setReportCategory(item);
                if (!isSlaVendors) {
                  return;
                } else {
                  if (item.label === "Category") {
                    navigate("/sla-category");
                  }
                }
              }}
            >
              {item.svg} {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default ItemsMenu;
