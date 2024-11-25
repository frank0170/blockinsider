import React, { useState, useEffect } from "react";
import { getCoinData, getCoinOHLCV } from "@/api/coinMarketCap";
import Sparkline from "@/app/shared/sparkline/sparkline";
const globalCard = "rounded-[10px] p-[16px] w-[438px] h-[236px]";
const globalTitle = "text-black font-semibold text-[20px]";

const BitcoinCard = () => {
  const coin = "BTC";

  const [coinData, setCoinData] = useState<any>({});
  const [coinOHLCV, setCoinOHLCV] = useState<any[]>([]);

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

  const normalizeData = (prices: any[]) => {
    const closes = prices.map((quote) => quote.close);
    const min = Math.min(...closes);
    const max = Math.max(...closes);
    return closes.map((price) => (price - min) / (max - min));
  };

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

  useEffect(() => {
    const fetchCoinOHLCV = async () => {
      const coinId = coinData?.id;
      const coinInterval = "1d";
      if (!coinId) return;

      try {
        const res = await getCoinOHLCV(coinId, coinInterval, 20);
        const chartData = res.data?.quotes?.map((item: any) => ({
          time: dateToChartTimeMinute(new Date(item.quote.USD.timestamp)),
          open: item.quote.USD.open,
          high: item.quote.USD.high,
          low: item.quote.USD.low,
          close: item.quote.USD.close,
        }));

        setCoinOHLCV(chartData || []);

        console.log("data", normalizeData(chartData));

        console.log("ohlcv", coinOHLCV);
      } catch (error) {
        console.error("Error fetching OHLCV data:", error);
      }
    };

    fetchCoinOHLCV();
  }, [coinData?.id]);

  console.log(coinData);
  return (
    <div
      className={globalCard}
      style={{
        border: "1px solid black",
        background: "white",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div className="w-full flex justify-between">
        <span className={globalTitle}>Bitcoin Dominance</span>
        <span>7D</span>
      </div>
      <Sparkline data={normalizeData(coinOHLCV)} />
    </div>
  );
};

const FearGreedCard = () => {
  return (
    <div
      className={globalCard}
      style={{ border: "1px solid black", background: "white" }}
    >
      <div className="w-full flex">
        <span className={globalTitle}>Fear & Greed Index</span>
      </div>
    </div>
  );
};

const EventsCard = () => {
  return (
    <div
      className={globalCard}
      style={{ border: "1px solid black", background: "white" }}
    >
      <div className="w-full flex">
        <span className={globalTitle}>Hot Events</span>
      </div>
    </div>
  );
};

export const Highlights = () => {
  return (
    <div className="flex justify-between gap-[20px] items-center">
      <BitcoinCard />
      <FearGreedCard />
      <EventsCard />
    </div>
  );
};
