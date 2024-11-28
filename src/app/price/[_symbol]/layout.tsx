"use client";
import React, {
  use,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  getCoinData,
  getCoinOHLCV,
  getCoinMetadata,
  getCoinNews,
} from "@/api/coinMarketCap";
import { useTheme } from "@/context/ThemeContext";
import Hero from "@/components/coin/hero/hero";
import { Tabs, Tab } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

type CoinDataContextType = {
  coinData: any;
  coinMetaData: any;
  coinOHLCV: any[];
  coinNews: any[];
};

// Create context with a default value
const CoinDataContext = createContext<CoinDataContextType | undefined>(
  undefined
);

// Hook to access context
export const useCoinData = () => {
  const context = useContext(CoinDataContext);
  if (!context) {
    throw new Error(
      "useCoinData must be used within a CoinDataContext.Provider"
    );
  }
  return context;
};

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Chart", value: "chart" },
  { label: "Markets", value: "markets" },
  { label: "News", value: "news" },
  { label: "Calendar", value: "calendar" },
];

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { isDarkMode } = useTheme();
  const { _symbol } = use<any>(params);
  const [coin, setCoin] = useState<string>(_symbol);
  const [coinData, setCoinData] = useState<any>({});
  const [coinMetaData, setCoinMetaData] = useState<any>({});
  const [coinOHLCV, setCoinOHLCV] = useState<any[]>([]);
  const [coinNews, setCoinNews] = useState<any[]>([]);
  const [coinInterval, setCoinInterval] = useState<string>("1d");
  const [dailyChanges, setDailyChanges] = useState<any[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const [activeTab, setActiveTab] = useState<string>("overview");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract tab from the URL
    const currentTab = pathname.split("/").pop() || "overview";
    setActiveTab(currentTab);

    console.log("active", activeTab);
  }, [pathname]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    router.push(`/price/${_symbol}/${newValue}`);
  };

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

        console.log("coin", coinData);
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

  const backgroundPage = isDarkMode
    ? "bg-[#454545] min-h-screen py-8 px-4"
    : "bg-gray-100 min-h-screen py-8 px-4";

  const divPage = isDarkMode
    ? "max-w-7xl mx-auto bg-[#555454] rounded-lg shadow-lg p-8"
    : "max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8";

  return (
    <div className={backgroundPage}>
      <div className={divPage}>
        <Hero {...{ coinData, coinMetaData }} />
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <br />
        {children}
      </div>
    </div>
  );
}
