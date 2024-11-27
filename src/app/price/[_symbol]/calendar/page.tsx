"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  use,
} from "react";
import { formatValuePrices } from "../../../../utils/numbers";
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

  return (
    <div className="w-full">
      {/* Main container */}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Last 30 days Calendar
        </h2>
        <BitcoinCalendar data={dailyChanges} />
      </div>

      <br />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Monthly Calendar
        </h2>
        <BitcoinMonthlyCalendar data={dailyChanges} />
      </div>
      <br />
    </div>
  );
}
