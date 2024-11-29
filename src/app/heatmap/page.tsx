"use client";

// pages/index.js
import { useEffect, useState } from "react";
import { getHeatMap } from "@/api/coinMarketCap";
import { Bar } from "react-chartjs-2";
import TradingViewWidget from "@/components/heatmap/tradingviewHeatmap";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const cryptoData = await getHeatMap("1", "50");
      setData(cryptoData.data);
    };

    fetchData();
    console.log("data", data);
  }, []);

  const chartData = {
    labels: data.map((crypto) => crypto.name),
    datasets: [
      {
        label: "24h % Change",
        data: data.map((crypto) => crypto.quote.USD.percent_change_24h),
        backgroundColor: data.map((crypto) => {
          const percentChange = crypto.quote.USD.percent_change_24h;
          return percentChange > 0
            ? "rgba(0, 255, 0, 0.6)"
            : "rgba(255, 0, 0, 0.6)";
        }),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto my-auto p-6">
      <h1 className="text-[30px] font-bold  mb-4">Crypto Heatmaps</h1>
      {/* <Bar data={chartData} />
      <br />
      <TradingViewWidget />

      <br /> */}
      <iframe
        src="https://coin360.com/widget/map?utm_source=embed_map"
        //@ts-expect-error
        frameborder="0"
        title="Blockinsider"
        width="100%"
        height="800px"
      ></iframe>
    </div>
  );
}
