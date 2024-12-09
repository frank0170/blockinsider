import React, { useState, useEffect } from "react";
import { getCoinData, getCoinOHLCV, getTrending } from "@/api/coinMarketCap";
import Sparkline from "@/app/shared/sparkline/sparkline";
import { useTheme } from "@/context/ThemeContext";
import { FearGreedIndex } from "@/components/coin/fearGreed/fearGreed";
import "./index.css";

const globalCard = "rounded-[10px] p-[16px] w-[438px] h-[336px]";

const BitcoinCard = ({ dark, globalTitle }) => {
  const coin = "bitcoin";

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

        const firstKey = Object.keys(res.data)[0];

        console.log("rez", res);
        setCoinData(res.data[firstKey] || {});
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
        const chartData = res?.map((item: any) => ({
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

  const style = dark
    ? { border: "1px solid #e0e0e0", background: "#555454" }
    : { border: "1px solid black", background: "white" };

  return (
    <div
      className={globalCard}
      style={{
        border: style.border,
        background: style.background,
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

const FearGreedCard = ({ dark, globalTitle }) => {
  const style = dark
    ? { border: "1px solid #e0e0e0", background: "#555454" }
    : { border: "1px solid black", background: "white" };

  return (
    <div className={globalCard} style={style}>
      <div className="w-full flex flex-col">
        <span className={globalTitle}>Fear & Greed Index</span>
        <FearGreedIndex />
      </div>
    </div>
  );
};

const EventsCard = ({ dark, globalTitle }) => {
  const [cryptos, setCryptos] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch trending cryptocurrencies
    const fetchTrending = async () => {
      try {
        const response = await getTrending();

        setCryptos(response.data);

        console.log("cry[to", response);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
      }
    };

    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        cryptos.length > 0 ? (prevIndex + 1) % cryptos.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [cryptos]);

  const style = dark
    ? { border: "1px solid #e0e0e0", background: "#555454" }
    : { border: "1px solid black", background: "white" };

  return (
    <div className={globalCard} style={style}>
      <div className="w-full flex flex-col">
        <span className={globalTitle}>Hot Events</span>

        <div className="crypto-list">
          {cryptos.length > 0 ? (
            <ul>
              {cryptos.slice(0, 5).map((crypto) => (
                <li key={crypto.id} className="crypto-item">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                    width={28}
                  />
                  <span className="crypto-name">{crypto.name}</span>
                  <span className="crypto-price">
                    ${crypto.quote.USD.price.toFixed(2)}
                  </span>
                  <span
                    className={`crypto-change ${
                      crypto.quote.USD.percent_change_24h > 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {crypto.quote.USD.percent_change_24h.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Highlights = () => {
  const { isDarkMode } = useTheme();
  const globalTitle = `text-[#${
    isDarkMode ? "e0e0e0" : "000000"
  } font-semibold text-[20px]`;

  return (
    <div className="flex justify-between gap-[20px] items-center">
      <BitcoinCard dark={isDarkMode} globalTitle={globalTitle} />
      <FearGreedCard dark={isDarkMode} globalTitle={globalTitle} />
      <EventsCard dark={isDarkMode} globalTitle={globalTitle} />
    </div>
  );
};
