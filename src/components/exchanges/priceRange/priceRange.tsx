// pages/index.js
import { useState, useEffect, use } from "react";
import { getCoinPriceRange } from "@/api/coinMarketCap";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./price.css";

export const ExchangeRange = ({ coinData, currency = "USD" }) => {
  const priceRange = {
    min: 0,
    max: 100,
    currentPrice: coinData,
  };
  // Calculate the position of the arrow as a percentage of the bar
  const getArrowPosition = () => {
    if (
      priceRange.min === null ||
      priceRange.max === null ||
      priceRange.currentPrice === null
    ) {
      return 0;
    }
    const range = priceRange.max - priceRange.min;
    const position = ((priceRange.currentPrice - priceRange.min) / range) * 100;
    return position;
  };

  return (
    <div className="container">
      <div className="price-range">
        <div className="price-bar-container">
          <div className="price-bar">
            {/* Filled portion of the bar */}
            <div
              className="filled-bar"
              style={{
                width: `${getArrowPosition()}%`, // Fill the bar up to the current price
              }}
            ></div>

            {/* Arrow and current price */}
            <div
              className="price-arrow"
              style={{
                left: `${getArrowPosition()}%`, // Dynamic position based on current price
              }}
            >
              <div className="current-price">
                {priceRange.currentPrice?.toLocaleString()}%
              </div>
              <div className="arrow">
                <ArrowDropDownIcon />
              </div>
            </div>
          </div>

          {/* Min and Max labels */}
          <div className="min-max">
            <span className="min">0</span>
            <span className="max">100</span>
          </div>
        </div>
      </div>

      {/* Timeframe buttons */}
      {/* <div className="timeline">
        <button onClick={() => setTimeframe("1")}>1D</button>
        <button onClick={() => setTimeframe("7")}>1W</button>
        <button onClick={() => setTimeframe("30")}>1M</button>
        <button onClick={() => setTimeframe("365")}>1Y</button>
      </div> */}
    </div>
  );
};
