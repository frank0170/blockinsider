"use client";
import { TopExchangeList } from "@/components/exchanges/topExchange";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { TopGainersList } from "@/components/topGainers";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Gainers({ type }) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center sm:items-start w-full">
        <div className="flex justify-end items-center w-full"></div>
        <div className="w-full">
          <TopGainersList interval={type} />
        </div>
      </main>
    </div>
  );
}
