"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  use,
} from "react";
import { formatValuePrices } from "../../../utils/numbers";
import { CryptoChart } from "@/components/coin/graph/graph";
import {
  getCoinData,
  getCoinMarket,
  getCoinMetadata,
  getCoinNews,
  getCoinOHLCV,
} from "@/api/coinMarketCap";
import BitcoinCalendar from "@/components/coin/calendar/calendar";
import BitcoinMonthlyCalendar from "@/components/coin/monthly/monthly";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import TopicIcon from "@mui/icons-material/Topic";
import CodeIcon from "@mui/icons-material/Code";
import { ExchangeList } from "@/components/coin/topCrypto";
import Switch from "@mui/material/Switch";
import CryptoNews from "@/components/coin/news/news";
import { useTheme } from "@/context/ThemeContext";

export default function Page({ params }: any) {
  const { _symbol } = use<any>(params);
  const [coin, setCoin] = useState<string>(_symbol);
  const [coinData, setCoinData] = useState<any>({});
  const [coinMetaData, setCoinMetaData] = useState<any>({});
  const [coinOHLCV, setCoinOHLCV] = useState<any[]>([]);
  const [coinNews, setCoinNews] = useState<any[]>([]);
  const [coinInterval, setCoinInterval] = useState<string>("1d");
  const [dailyChanges, setDailyChanges] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const { isDarkMode } = useTheme();

  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  // Set the coin state when _symbol changes
  useEffect(() => {
    if (_symbol) {
      setCoin(_symbol);
    }
  }, [_symbol]);

  // Fetch coin data when the coin symbol changes
  useEffect(() => {
    const fetchData = async () => {
      if (!coin) return;

      try {
        const res = await getCoinData(coin, "USD");
        const firstKey = Object.keys(res.data)[0];

        setCoinData(res.data[firstKey] || {});
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchData();
  }, [coin]);

  // Memoize the dateToChartTimeMinute function
  const dateToChartTimeMinute = useCallback((date: any) => {
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
  }, []);

  // Fetch OHLCV, metadata, and news data when coinData or coinInterval changes
  useEffect(() => {
    const fetchCoinOHLCV = async () => {
      const coinId = coinData?.id;
      if (!coinId || !coinInterval) return;

      try {
        const [ohlcvRes, metadataRes, newsRes] = await Promise.all([
          getCoinOHLCV(coinId, coinInterval, 1000),
          getCoinMetadata(coinId),
          getCoinNews(coinData.symbol),
        ]);

        const firstKey = Object.keys(metadataRes.data)[0];

        setCoinMetaData(metadataRes.data[firstKey]);
        setCoinNews(newsRes.results);

        const chartData = ohlcvRes.data?.quotes?.map((item: any) => ({
          time: dateToChartTimeMinute(new Date(item.quote.USD.timestamp)),
          open: item.quote.USD.open,
          high: item.quote.USD.high,
          low: item.quote.USD.low,
          close: item.quote.USD.close,
        }));

        setCoinOHLCV(chartData || []);
      } catch (error) {
        console.error("Error fetching OHLCV data:", error);
      }
    };

    fetchCoinOHLCV();
  }, [coinData?.id, coinInterval, dateToChartTimeMinute]);

  // Memoize the daily changes calculation to avoid recalculating on every render
  const calculatedDailyChanges = useMemo(() => {
    return (
      coinOHLCV
        ?.map((entry: any, index: number) => {
          if (index === 0) return null;
          const prevClose = coinOHLCV[index - 1].close;
          const currClose = entry.close;
          const change = ((currClose - prevClose) / prevClose) * 100;

          return {
            date: new Date(entry.time * 1000).toISOString().split("T")[0],
            change: parseFloat(change.toFixed(2)),
          };
        })
        ?.filter(Boolean) || []
    );
  }, [coinOHLCV]);

  useLayoutEffect(() => {
    setDailyChanges(calculatedDailyChanges); // Update daily changes on calculation
  }, [calculatedDailyChanges]);

  const statStyle = isDarkMode
    ? "bg-[#454545] p-6 rounded-lg shadow-md"
    : "bg-gray-50 p-6 rounded-lg shadow-md";

  return (
    <div className="w-full">
      {/* Main container */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className={statStyle}>
          <h3 className="text-xl font-medium ">Market Cap</h3>
          <p className="text-lg ">
            ${formatValuePrices(coinData?.quote?.USD?.market_cap) || "N/A"}
          </p>
        </div>

        <div className={statStyle}>
          <h3 className="text-xl font-medium ">Circulating Supply</h3>
          <p className="text-lg ">
            ${formatValuePrices(coinData?.circulating_supply) || "N/A"}
          </p>
        </div>

        <div className={statStyle}>
          <h3 className="text-xl font-medium ">Total Supply</h3>
          <p className="text-lg ">
            ${formatValuePrices(coinData?.total_supply) || "N/A"}
          </p>
        </div>

        <div className={statStyle}>
          <h3 className="text-xl font-medium ">Max Supply</h3>
          <p className="text-lg ">
            ${formatValuePrices(coinData?.max_supply) || "N/A"}
          </p>
        </div>

        <div className={statStyle}>
          <h3 className="text-xl font-medium ">24h Change</h3>
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
        <div className={statStyle}>
          <h3 className="text-xl font-medium">24h Volume</h3>
          <p className="text-lg ">
            ${formatValuePrices(coinData?.quote?.USD?.volume_24h) || "N/A"}
          </p>
        </div>
      </div>

      {/* Price chart */}
      <br />
      <div
        className={`bg-[#${
          isDarkMode ? "555454" : "FFFFFF"
        }] p-6 rounded-lg shadow-md`}
      >
        <h2 className="text-xl font-medium  mb-4">Price Chart - daily</h2>

        {/* <div className="flex space-x-4 mb-4">
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
          </div> */}

        <div className="h-[400px] bg-gray-200 rounded-lg">
          <CryptoChart data={coinOHLCV} />
        </div>
      </div>

      <br />

      <div
        className={`bg-[#${
          isDarkMode ? "555454" : "FFFFFF"
        }] p-6 rounded-lg shadow-md`}
      >
        <h2 className="text-xl font-medium mb-4">Last 30 days Calendar</h2>
        <BitcoinCalendar data={dailyChanges} />
      </div>

      <br />

      <div
        className={`bg-[#${
          isDarkMode ? "555454" : "FFFFFF"
        }] p-6 rounded-lg shadow-md`}
      >
        {" "}
        <h2 className="text-xl font-medium  mb-4">Monthly Calendar</h2>
        <BitcoinMonthlyCalendar data={dailyChanges} />
      </div>
      <br />

      <div
        className={`bg-[#${
          isDarkMode ? "555454" : "FFFFFF"
        }] p-6 rounded-lg shadow-md`}
      >
        {" "}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium  mb-4">
            {coinData?.symbol} Markets
          </h2>
          <div>
            <span>Spot</span>
            <Switch
              checked={isChecked} // Controlled component
              onChange={handleChange} // Updates state when toggled
              color="default"
            />
            <span>Futures</span>
          </div>
        </div>
        <ExchangeList
          coinId={coinData?.id}
          type={!isChecked ? "spot" : "derivatives"}
          overview
        />
      </div>

      {/* News Section */}
      <div
        className={`bg-[#${
          isDarkMode ? "555454" : "FFFFFF"
        }] p-6 rounded-lg shadow-md`}
      >
        <h2 className="text-2xl font-semibold  mb-4">Latest News</h2>
        <CryptoNews news={coinNews} symbol={coinData?.symbol} overview />
      </div>
    </div>
  );
}
