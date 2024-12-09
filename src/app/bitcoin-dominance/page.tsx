"use client";

import { useEffect, useState } from "react";
import { getGlobalMetrics } from "@/api/coinMarketCap";
import BitcoinDominanceChart from "@/components/bitcoinDominance/index";

export default function Home() {
  const [dataPoints, setDataPoints] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metrics = await getGlobalMetrics();
        setDataPoints([
          {
            timestamp: metrics?.data?.quote?.USD?.last_updated,
            bitcoin_dominance: metrics?.data?.btc_dominance,
          },
        ]);
        console.log(metrics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Bitcoin Dominance Chart</h1>
      {/* {dataPoints.length > 0 ? (
        <BitcoinDominanceChart dataPoints={dataPoints} />
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}
