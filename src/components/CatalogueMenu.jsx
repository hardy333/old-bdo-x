import React, { useState } from "react";
import SearchSvg from "./svgs/SearchSvg";

import { BsArrowRightShort } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

import data from "../assets/goodwill-data.json";

let categories = [];
let resData = {};

const processData = (data) => {
  const allCategories = [];
  data.forEach((obj) => {
    allCategories.push(obj.category);
  });

  categories = Array.from(new Set(allCategories));

  data.forEach((obj) => {
    if (resData[obj.category]) {
      resData[obj.category].push(obj.product);
    } else {
      resData[obj.category] = [obj.product];
    }
  });
};

processData(data);

const CatalogueMenu = ({ changeAllData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOutsideWrapper, setIsOutsideWrapper] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [subCategorySearchValue, setSubCategorySearchValue] = useState("");

  const handleMouseOver = (e) => {
    if (e.target.classList.contains("category-li")) {
      const span = e.target.querySelector(".category-name");
      const cat = span.getAttribute("data-value");
      setSelectedCategory(cat);
    }
  };

  const handleMouseLeave = (e) => {
    setIsOutsideWrapper(true);
  };

  const handleMouseEnter = (e) => {
    setIsOutsideWrapper(false);
  };

  const handleProductClick = (e, name) => {
    setIsOutsideWrapper(true);
    setSelectedProduct(name);
    if (changeAllData) {
      changeAllData();
    }
  };

  let arrLeft = [];
  let arrRight = [];

  if (resData && selectedCategory) {
    resData[selectedCategory]
      .filter((name) => name.includes(subCategorySearchValue))
      .forEach((name, index) => {
        if (index % 2 === 0) {
          arrLeft.push(name);
        } else {
          arrRight.push(name);
        }
      });
  }

  return (
    <div
      className="catalogue-menu-wrapper"
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        width: isOutsideWrapper ? "200px" : "850px",
      }}
    >
      <section className="catalogue-menu-list-1">
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            value={categorySearchValue}
            onChange={(e) => setCategorySearchValue(e.target.value)}
          />
          <SearchSvg />
        </div>
        <ul onMouseMove={handleMouseOver}>
          {categories
            .filter((name) => name.includes(categorySearchValue))
            .map((category, i) => (
              <li
                className={`category-li ${
                  selectedCategory === category ? "active" : ""
                }`}
                key={i}
              >
                <span className="category-name" data-value={category}>
                  {category}
                </span>
                <span className="category-arrow">
                  <BsArrowRightShort />
                </span>
              </li>
            ))}
        </ul>
        <div className="catalogue-menu-footer">
          <p>
            View full structure <MdKeyboardArrowRight />
          </p>
        </div>
      </section>
      <section
        className={`catalogue-menu-list-2 ${isOutsideWrapper ? "" : "open"}`}
      >
        <div className="input-wrapper">
          <input
            type="text"
            className="input"
            value={subCategorySearchValue}
            onChange={(e) => setSubCategorySearchValue(e.target.value)}
          />
          <SearchSvg />
        </div>
        <div className="catalogue-menu-list-2__list-wrapper">
          <ul className="left">
            {arrLeft.map((name, index) => {
              return (
                <li
                  onClick={(e) => handleProductClick(e, name)}
                  key={name + index}
                  style={{
                    color: name === selectedProduct ? "#6E0FF5" : "",
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
          <ul className="right">
            {arrRight.map((name, index) => {
              return (
                <li
                  onClick={(e) => handleProductClick(e, name)}
                  key={name + index}
                  style={{
                    color: name === selectedProduct ? "#6E0FF5" : "",
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CatalogueMenu;
