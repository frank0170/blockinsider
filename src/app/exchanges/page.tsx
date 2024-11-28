"use client";
import { TopExchangeList } from "@/components/exchanges/topExchange";
import { useState } from "react";
import Switch from "@mui/material/Switch";

export default function Home() {
  const [type, setType] = useState("spot");

  const handleChange = (event: any) => {
    setType(event.target.checked ? "derivative" : "spot"); // Corrected logic
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-[24px] pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[1200px]">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="text-[30px] font-bold text-gray-700 mb-4">
            Exchanges
          </h1>
          <div>
            <div>
              <span>Spot</span>
              <Switch
                checked={type === "derivative"} // Controlled component
                onChange={handleChange} // Updates state when toggled
                color="default"
              />
              <span>Futures</span>
            </div>
          </div>
        </div>
        <TopExchangeList {...{ type }} />
      </main>
    </div>
  );
}
