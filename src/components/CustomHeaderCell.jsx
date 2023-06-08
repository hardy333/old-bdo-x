import React, { useState } from "react";
import "../styles/custom-header-cell.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import dotsSvg from "../assets/employees/dots.svg";
import dotsSvg2 from "../assets/dotsSvg2.svg";
import downIcon from "../assets/marlin-icons/down-arrow.png";
import classNames from "classnames";
import HeaderCellMenu2 from "./HeaderCellMenu2";

const CustomHeaderCell = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [sortingState, setSortingState] = useState(["none", "asc", "desc"]);
  const [sortingStateIndex, setSortingStateIndex] = useState(0);

  const handleSorting = () => {
    // disableAllColumnsSorting();

    let newIndex = sortingStateIndex + 1;
    if (sortingStateIndex >= sortingState.length - 1) {
      newIndex = 0;
    }

    setSortingStateIndex(newIndex);

    const currSortingState = sortingState[newIndex];

    if (currSortingState === null) {
      props.columnApi.applyColumnState({
        defaultState: { sort: null },
      });
    } else {
      props.columnApi.applyColumnState({
        state: [{ colId: props.column.colId, sort: currSortingState }],
        defaultState: { sort: null },
      });
    }
  };

  const disableAllColumnsSorting = () => {
    document
      .querySelectorAll(".custom-header-cell-container")
      .forEach((hCell) => {
        hCell.classList.remove("asc");
        hCell.classList.remove("desc");
      });
  };

  return (
    <div
      className={classNames({
        "custom-header-cell-container": true,
        asc: sortingState[sortingStateIndex] === "asc",
        desc: sortingState[sortingStateIndex] === "desc",
      })}
    >
      <span onClick={handleSorting}>
        {props.displayName}
        <img src={downIcon} className="heading-sorting-arrow-img" alt="" />
      </span>

      <HeaderCellMenu2 p={props} />
      {/* <Menu
        className="header-cell-menu"
        menuButton={
          <MenuButton>
            <img src={dotsSvg2} alt="" />
          </MenuButton>
        }
        transition
      >
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              // state: [{ colId: props.displayName, sort: "desc" }],
              defaultState: { sort: null },
            });

            setSortingStateIndex(0);
          }}
          className={classNames({
            "clear-sort": true,
            active: sortingStateIndex !== 0,
          })}
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80.01 33.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m56.93,6.13H3.07c-1.69,0-3.07-1.37-3.07-3.07S1.37,0,3.07,0h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m66.94,19.69H13.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m76.95,33.24H23.08c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
          </svg>
          Clear Sort
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              state: [{ colId: props.column.colId, sort: "desc" }],
              defaultState: { sort: null },
            });

            setSortingStateIndex(2);
          }}
          className={classNames({
            active: sortingStateIndex !== 2,
          })}
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 33.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m56.93,6.13H3.07c-1.69,0-3.07-1.37-3.07-3.07S1.37,0,3.07,0h53.87c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m40.92,19.69H3.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h37.86c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m24.92,33.24H3.07c-1.69,0-3.07-1.37-3.07-3.07s1.37-3.07,3.07-3.07h21.85c1.69,0,3.07,1.37,3.07,3.07s-1.37,3.07-3.07,3.07Z"
            />
          </svg>
          Sort by descending
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.applyColumnState({
              state: [{ colId: props.column.colId, sort: "asc" }],
              defaultState: { sort: null },
            });
            setSortingStateIndex(1);
          }}
          className={classNames({
            active: sortingStateIndex !== 1,
          })}
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 33.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m56.93,27.11H3.07c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07h53.87c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07Z"
            />
            <path
              className="cls-1"
              d="m40.92,13.56H3.07c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07h37.86c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07Z"
            />
            <path
              className="cls-1"
              d="m24.92,0H3.07C1.37,0,0,1.37,0,3.07s1.37,3.07,3.07,3.07h21.85c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07Z"
            />
          </svg>
          Sort by ascending
        </MenuItem>
        <MenuItem>
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 45.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m3.07,16.15h53.87c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07H3.07c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m8.31,5.27l39.04,39.04c1.23,1.23,3.19,1.25,4.39.05s1.17-3.16-.05-4.39L12.65.94c-1.23-1.23-3.19-1.25-4.39-.05s-1.17,3.16.05,4.39Z"
            />
            <path
              className="cls-1"
              d="m14.07,29.71h31.86c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07H14.07c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m23.58,43.27h12.84c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07h-12.84c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07Z"
            />
          </svg>
          Clear filter
        </MenuItem>
        <MenuItem>
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 33.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m3.07,6.13h53.87c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07H3.07C1.37,0,0,1.37,0,3.07s1.37,3.07,3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m14.07,19.69h31.86c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07H14.07c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07Z"
            />
            <path
              className="cls-1"
              d="m23.58,33.24h12.84c1.69,0,3.07-1.37,3.07-3.07s-1.37-3.07-3.07-3.07h-12.84c-1.69,0-3.07,1.37-3.07,3.07s1.37,3.07,3.07,3.07Z"
            />
          </svg>
          Filter By Status
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.setColumnVisible(props.column.colId, false);
          }}
          className="active"
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60.51 49.24"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m60.11,22.99c-.29-.58-7.92-13.54-29.38-13.75-.17-.04-.37-.04-.58-.04h-.08c-3.42,0-6.46.38-9.21.96L11.61.91c-1.25-1.21-3.21-1.21-4.42,0-.92.92-1.17,2.25-.71,3.38.17.37.38.75.71,1.04l6.83,6.87,4.88,4.83,5.58,5.58,8.5,8.5,2.5,2.54,5.42,5.42,9.25,9.25c.33.29.71.54,1.08.67.37.17.75.25,1.13.25.83,0,1.63-.33,2.21-.92,1.25-1.25,1.25-3.21,0-4.42l-7.08-7.08c8.87-3.92,12.42-10,12.62-10.38.33-.54.46-1.08.37-1.67v-.04c.09-.58-.04-1.21-.37-1.75Zm-17.42,9.04l-5.38-5.38c.25-.62.33-1.29.33-1.96,0-3.71-3.04-6.75-6.75-6.75-.71,0-1.33.08-1.96.33l-2.62-2.62c1.21-.13,2.5-.21,3.83-.21h.21c14.25.08,21.04,6.46,23.33,9.29-1.5,1.83-4.92,5.17-11,7.29Z"
            />
            <path
              className="cls-1"
              d="m33.86,40.07c-1.08.13-2.25.17-3.42.17h-.37C8.36,40.12.69,27.03.36,26.45c-.29-.54-.42-1.17-.33-1.75v-.08c-.08-.54.04-1.13.33-1.62.17-.33,2.58-4.42,8.33-8.08l4.54,4.54c-3.33,1.87-5.38,3.96-6.46,5.29,2.25,2.67,8.37,8.42,20.88,9.13l.04.04.67.67,5.5,5.5Z"
            />
          </svg>
          Hide current column
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.columnApi.getColumns().forEach((column) => {
              props.columnApi.setColumnVisible(column.colId, true);
            });
          }}
          className="active"
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33.58 47.28"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="m27.9,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
            />
            <path
              className="cls-1"
              d="m13.95,44.44V2.84c0-1.57,1.27-2.84,2.84-2.84s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
            />
            <path
              className="cls-1"
              d="m0,44.44V2.84C0,1.27,1.27,0,2.84,0s2.84,1.27,2.84,2.84v41.61c0,1.57-1.27,2.84-2.84,2.84s-2.84-1.27-2.84-2.84Z"
            />
          </svg>
          Show All Columns
        </MenuItem>
      </Menu> */}
    </div>
  );
};

export default CustomHeaderCell;
