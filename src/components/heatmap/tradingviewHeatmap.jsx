"use client"; // Next.js directive for client-side components

import { getTopCryptoList } from "@/api/coinMarketCap";
import React, { useEffect, useState, memo } from "react";
import "./index.css";

function CryptoHeatmap() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "YOUR_COINMARKETCAP_API_KEY"; // Replace with your API key

  // Fetch data from CoinMarketCap API
  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await getTopCryptoList();

        if (response) {
          setCryptoData(response.data);
          setLoading(false);
        } else {
          setError("Failed to fetch data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    }

    fetchCryptoData();
  }, [apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate total market cap of all coins
  const totalMarketCap = cryptoData.reduce(
    (total, coin) => total + coin.quote.USD.market_cap,
    0
  );

  // Calculate the block size based on the market cap percentage
  const calculateBlockSize = (marketCap) => {
    const percentage = (marketCap / totalMarketCap) * 100;
    return percentage; // Proportional percentage, the higher the market cap, the bigger the block
  };

  return (
    <div className="heatmap-container">
      {cryptoData.map((coin) => {
        const blockSizePercentage = calculateBlockSize(
          coin.quote.USD.market_cap
        );
        const blockSize = `${blockSizePercentage}%`; // Size as a percentage of the total space

        return (
          <div
            key={coin.id}
            className="crypto-block"
            style={{
              backgroundColor:
                coin.quote.USD.percent_change_24h > 0 ? "#28a745" : "#dc3545",
              flexBasis: blockSize, // Sets the width and height based on the percentage
            }}
          >
            <div className="crypto-symbol">{coin.symbol}</div>
            <div className="crypto-price">
              ${coin.quote.USD.price.toFixed(2)}
            </div>
            <div className="crypto-change">
              {coin.quote.USD.percent_change_24h.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(CryptoHeatmap);
