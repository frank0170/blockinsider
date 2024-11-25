"use client";

import React, { useState, useEffect, use } from "react";
import { formatValuePrices } from "../../../utils/numbers";
import { CryptoChart } from "@/components/coin/graph/graph";
import { getCoinData, getCoinOHLCV } from "@/api/coinMarketCap";
import BitcoinCalendar from "@/components/coin/calendar/calendar";
import BitcoinMonthlyCalendar from "@/components/coin/monthly/monthly";

export default function Page({ params }: any) {
  const { _symbol } = use<any>(params);
  const [coin, setCoin] = useState<string>(_symbol);
  const [coinData, setCoinData] = useState<any>({});
  const [coinOHLCV, setCoinOHLCV] = useState<any[]>([]);
  const [coinInterval, setCoinInterval] = useState<string>("1d");
  const [dailyChanges, setDailyChanges] = useState<any[]>([]);

  useEffect(() => {
    if (_symbol) {
      setCoin(_symbol);
    }
  }, [_symbol]);

  useEffect(() => {
    const fetchData = async () => {
      if (!coin) return;

      try {
        const res = await getCoinData(coin, "USD");
        setCoinData(res.data[coin] || {});
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchData();
  }, [coin]);

  const dateToChartTimeMinute = (date: any) => {
    return (
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        0,
        0
      ) / 1000
    );
  };

  useEffect(() => {
    const fetchCoinOHLCV = async () => {
      const coinId = coinData?.id;
      if (!coinId || !coinInterval) return;

      try {
        const res = await getCoinOHLCV(coinId, coinInterval, 1000);
        const chartData = res.data?.quotes?.map((item: any) => ({
          time: dateToChartTimeMinute(new Date(item.quote.USD.timestamp)),
          open: item.quote.USD.open,
          high: item.quote.USD.high,
          low: item.quote.USD.low,
          close: item.quote.USD.close,
        }));

        setCoinOHLCV(chartData || []);
        // Calculate daily percentage changes
        const dailyData = chartData?.map((entry: any, index: number) => {
          if (index === 0) return null;
          const prevClose = chartData[index - 1].close;
          const currClose = entry.close;
          const change = ((currClose - prevClose) / prevClose) * 100;

          return {
            date: new Date(entry.time * 1000).toISOString().split("T")[0], // Format as YYYY-MM-DD
            change: parseFloat(change.toFixed(2)), // 2 decimals
          };
        });

        setDailyChanges(dailyData?.filter(Boolean) || []);
      } catch (error) {
        console.error("Error fetching OHLCV data:", error);
      }
    };

    fetchCoinOHLCV();
  }, [coinData?.id, coinInterval]);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      {/* Main container */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {coinData?.name}
              <p className="text-lg text-gray-500">{coinData?.symbol}</p>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-800">
              ${coinData?.quote?.USD?.price?.toLocaleString() || "N/A"}
            </span>
            <p className="text-sm text-gray-500">Price in USD</p>
          </div>
        </div>

        {/* Price stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">Market Cap</h3>
            <p className="text-lg text-gray-900">
              ${formatValuePrices(coinData?.quote?.USD?.market_cap) || "N/A"}
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">24h Change</h3>
            <p
              className={`text-lg ${
                coinData?.quote?.USD?.percent_change_24h > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {coinData?.quote?.USD?.percent_change_24h?.toFixed(2) || "N/A"}%
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-700">24h Volume</h3>
            <p className="text-lg text-gray-900">
              ${formatValuePrices(coinData?.quote?.USD?.volume_24h) || "N/A"}
            </p>
          </div>
        </div>

        {/* Price chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Price Chart
          </h2>

          <div className="flex space-x-4 mb-4">
            <button
              className="w-[40px] rounded-lg px-2 py-1 border border-black"
              onClick={() => setCoinInterval("7d")}
            >
              1W
            </button>
            <button
              className="w-[40px] rounded-lg px-2 py-1 border border-black"
              onClick={() => setCoinInterval("1d")}
            >
              1D
            </button>
            <button
              className="w-[40px] rounded-lg px-2 py-1 border border-black"
              onClick={() => setCoinInterval("1h")}
            >
              1H
            </button>
          </div>

          <div className="h-[400px] bg-gray-200 rounded-lg">
            <CryptoChart data={coinOHLCV} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Bitcoin Daily Price Changes Calendar
          </h2>
          <BitcoinCalendar data={dailyChanges} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            Bitcoin Monthly Price Changes Calendar
          </h2>
          <BitcoinMonthlyCalendar data={dailyChanges} />
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
