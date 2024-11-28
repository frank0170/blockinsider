"use client";

import React, { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  CrosshairMode,
} from "lightweight-charts";
import { useTheme } from "@/context/ThemeContext";

interface CryptoChartProps {
  data: CandlestickData[];
}

export const CryptoChart: React.FC<CryptoChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: 400,
      layout: {
        background: { color: isDarkMode ? "#555454" : "#FFFFFF" },
        textColor: isDarkMode ? "#FFFFFF" : "#000000",
      },
      grid: {
        vertLines: { color: "#e1e1e1" },
        horzLines: { color: "#e1e1e1" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#e53935",
      borderVisible: false,
      wickUpColor: "#4caf50",
      wickDownColor: "#e53935",
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    // Cleanup on component unmount
    return () => {
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(data);
    }
  }, [data]);

  // Dynamically update chart layout when `isDarkMode` changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        layout: {
          background: { color: isDarkMode ? "#555454" : "#FFFFFF" },
          textColor: isDarkMode ? "#FFFFFF" : "#000000",
        },
      });
    }
  }, [isDarkMode]);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: "relative", width: "100%", height: "400px" }}
    />
  );
};
