// pages/index.js
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

      const prices = response.data.quotes;

      // Get the min and max prices
      const minPrice = Math.min(
        ...prices.map((price) => price.quote.USD.close)
      );
      const maxPrice = Math.max(
        ...prices.map((price) => price.quote.USD.close)
      );
      const currentPrice = coinData?.quote?.USD?.price;

      // Update the state with the price range and current price
      setPriceRange({ min: minPrice, max: maxPrice, currentPrice });

      console.log(minPrice, maxPrice, currentPrice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  // Fetch price data when `timeframe` or `coinData` changes
  useEffect(() => {
    fetchPriceData(timeframe); // Use the updated timeframe
  }, [timeframe, coinData]);

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
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                  ${priceRange.currentPrice?.toLocaleString()}
                </div>
                <div className="arrow">
                  <ArrowDropDownIcon />
                </div>
              </div>
            </div>

            {/* Min and Max labels */}
            <div className="min-max">
              <span className="min">${priceRange.min?.toLocaleString()}</span>
              <span className="max">${priceRange.max?.toLocaleString()}</span>
            </div>
          </div>
        )}
        <div className="w-full flex justify-center relative top-[-15px]">
          Last 7 days price
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
