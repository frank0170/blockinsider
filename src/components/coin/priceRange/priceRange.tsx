// pages/index.js
"use client";

import { useState, useEffect, use } from "react";
import { getCoinPriceRange } from "@/api/coinMarketCap";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./price.css";

export const PriceRange = ({ coinData, currency = "USD" }) => {
  const [priceRange, setPriceRange] = useState<any>({
    min: null,
    max: null,
    currentPrice: null,
  });
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("1"); // State to track the selected timeframe

  // Function to fetch price data from CoinMarketCap API
  const fetchPriceData = async (timeframe) => {
    setLoading(true);

    if (!coinData.id) return;

    // Set the start and end dates for different timeframes (1 day, 1 week, 1 month, 1 year)
    const startDate = new Date();
    startDate.setDate(
      startDate.getDate() -
        (timeframe === "1"
          ? 7
          : timeframe === "7"
          ? 7
          : timeframe === "30"
          ? 30
          : 365)
    );

    const startDateString = startDate.toISOString();

    console.log("start", startDateString);

    try {
      const response = await getCoinPriceRange(
        coinData.id,
        "daily",
        startDateString
      );

      const prices = response || [];
      if (prices.length === 0) {
        throw new Error("No price data available");
      }
  
      const validPrices = prices.map((price) => price.quote.USD.close || 0);
      const minPrice = Math.min(...validPrices);
      const maxPrice = Math.max(...validPrices);
      const currentPrice = coinData?.quote?.USD?.price;
  
      console.log("Prices:", validPrices); // Check all prices
      console.log("Min:", minPrice, "Max:", maxPrice, "Current:", currentPrice);
  
      setPriceRange({
        min: isFinite(minPrice) ? minPrice : null,
        max: isFinite(maxPrice) ? maxPrice : null,
        currentPrice: currentPrice || null,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setPriceRange({
        min: null,
        max: null,
        currentPrice: null,
      });
    }
  
    setLoading(false);
  };

  // Listen to timeframe changes and fetch data
  useEffect(() => {
    if (timeframe && coinData) {
      console.log("Fetching data for timeframe:", timeframe);
      fetchPriceData(timeframe); // Fetch data when timeframe changes
    }
  }, [timeframe, coinData]); // Trigger fetch when `timeframe` or `coinData` changes

  const getArrowPosition = () => {
    if (
      priceRange.min === null ||
      priceRange.max === null ||
      priceRange.currentPrice === null
    ) {
      return 0;
    }
  
    const range = priceRange.max - priceRange.min;
    if (range === 0) return 50; // Dacă min și max sunt egale, săgeata e la mijloc.
  
    const position = ((priceRange.currentPrice - priceRange.min) / range) * 100;
    return Math.min(Math.max(position, 0), 100); // Asigurăm că e între 0-100%
  };

  const formatNumber = (num) => {
    return num?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="container">
    <div className="price-range">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Low și High în partea de sus */}
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500 font-medium">Low</span>
            <span className="text-gray-500 font-medium">High</span>
          </div>

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
                  ${formatNumber(priceRange.currentPrice)}
                </div>
                <div className="arrow">
                  <ArrowDropDownIcon />
                </div>
              </div>
            </div>

            {/* Min and Max labels */}
            <div className="min-max">
              <span className="min">${formatNumber(priceRange.min)}</span>
              <span className="max">${formatNumber(priceRange.max)}</span>
            </div>
          </div>
        </>
      )}
      <div className="w-full flex justify-center relative top-[-15px]">
        Last {timeframe} days price
      </div>
    </div>

    {/* Timeframe buttons */}
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setTimeframe("1")}
        className={`px-4 py-2 rounded-md text-sm ${
          timeframe === "1" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        1D
      </button>
      <button
        onClick={() => setTimeframe("7")}
        className={`px-4 py-2 rounded-md text-sm ${
          timeframe === "7" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        7D
      </button>
      <button
        onClick={() => setTimeframe("30")}
        className={`px-4 py-2 rounded-md text-sm ${
          timeframe === "30" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        30D
      </button>
    </div>
  </div>
);
};





