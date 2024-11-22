"use client";
import React, { useState, useEffect } from "react";
import { formatValuePrices } from "../../../utils/numbers";
import { getCoinData } from "@/api/coinMarketCap";

export default function Page({ params }: any) {
  const { _symbol } = params;
  const [coinData, setCoinData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCoinData(_symbol, "USD");
      setCoinData(res.data);
      console.log(res);
    };

    fetchData();
  }, [_symbol]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      {/* Main container */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {coinData[_symbol]?.name}
              <p className="text-lg text-gray-500">
                {coinData[_symbol]?.symbol}
              </p>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-800">
              ${coinData[_symbol]?.quote?.USD?.price?.toLocaleString()}
            </span>
            <p className="text-sm text-gray-500">Price in USD</p>
          </div>
        </div>

        {/* Price stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">Market Cap</h3>
            <p className="text-lg text-gray-900">
              ${formatValuePrices(coinData[_symbol]?.quote?.USD?.market_cap)}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">24h Change</h3>
            <p className="text-lg text-green-600">
              {coinData[
                _symbol
              ]?.quote?.USD?.percent_change_24h?.toLocaleString()}
              %
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">24h Volume</h3>
            <p className="text-lg text-gray-900">
              ${formatValuePrices(coinData[_symbol]?.quote?.USD?.volume_24h)}
            </p>
          </div>
        </div>

        {/* Price chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Price Chart
          </h2>
          {/* Placeholder for Chart */}
          <div className="h-64 bg-gray-200 rounded-lg">
            {/* Add your chart here */}
          </div>
        </div>

        {/* News Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Latest News
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Bitcoin Hits New Highs
              </h3>
              <p className="text-gray-600 text-sm">
                Bitcoin reaches a new record high price in the last 24 hours...
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Bitcoin Adoption Growing
              </h3>
              <p className="text-gray-600 text-sm">
                More companies are adopting Bitcoin as a store of value...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
