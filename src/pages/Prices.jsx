import React from "react";
import "../styles/prices.css";

import essentialImg from "../assets/prices/essential.svg";
import standardImg from "../assets/prices/standard.svg";
import proImg from "../assets/prices/pro.svg";
import fireImg from "../assets/prices/fire.svg";

const Prices = () => {
  return (
    <>
      <section className="prices">
        <div className="prices__container">
          {/* Price Card 1 */}
          <article className="price-card price-card-essential">
            <h2>Essential</h2>
            <h3>1099 Gel</h3>
            <img src={essentialImg} alt="" />
            <ul>
              <li>Web Portal</li>
              <li>Managing sharable data</li>
              <li>
                Sending orders to suppliers directly form ERP automatically
              </li>
              <li>Matching deliveries to ERP-generated orders</li>
              <li>Returning balances that supplier can actually deliver</li>
            </ul>
            <button className="btn btn-outlined">Try Now</button>
          </article>
          {/* Price Card 2 */}
          <article className="price-card price-card-standard">
            <div className="fire-div">
              <img src={fireImg} alt="" />
              <span>most popular</span>
            </div>
            <h2>Essential</h2>
            <h3>1099 Gel</h3>
            <img src={standardImg} alt="" />
            <ul>
              <li>Web Portal</li>
              <li>Managing sharable data</li>
              <li>
                Sending orders to suppliers directly form ERP automatically
              </li>
              <li>Matching deliveries to ERP-generated orders</li>
              <li>Returning balances that supplier can actually deliver</li>
              <li>Stock return and refund requests </li>
              <li>
                Service level reporting: delivery accuracy and time needed
              </li>
            </ul>
            <button className="btn btn-outlined">Try Now</button>
          </article>
          {/* Price Card 3 */}
          <article className="price-card price-card-pro">
            <h2>Business Pro</h2>
            <h3>5199 GEL</h3>
            <img src={proImg} alt="" />
            <ul>
              <li>Web Portal</li>
              <li>Managing sharable data</li>
              <li>Matching deliveries to ERP-generated orders</li>
              <li>
                Sending orders to suppliers directly form ERP automatically
              </li>
              <li>Matching deliveries to ERP-generated orders</li>
              <li>
                Sending orders to suppliers directly form ERP automatically
              </li>
              <li>Matching deliveries to ERP-generated orders</li>
              <li>suppliers balances that </li>
              <li>generated that </li>
              <li>Returning </li>
            </ul>
            <button className="btn btn-outlined">Try Now</button>
          </article>
        </div>
      </section>
    </>
  );
};

export default Prices;
