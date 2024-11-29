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
import { TopLosersList } from "@/components/topLosers";

export default function Home() {
  const [type, setType] = useState("24h");

  const handleChange = (event: any) => {
    const newType = event.target.value;
    setType(newType);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-[24px] pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-[1200px]">
        <div className="flex justify-between items-center w-full mb-6">
          <h1 className="text-[30px] font-bold  mb-4">Top 100 Losers</h1>
          <div>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Interval
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={type} // Controlled value
                onChange={handleChange} // Update interval state
              >
                <FormControlLabel value="1h" control={<Radio />} label="1H" />
                <FormControlLabel value="24h" control={<Radio />} label="24H" />
                <FormControlLabel value="7d" control={<Radio />} label="7D" />
                <FormControlLabel value="30d" control={<Radio />} label="30D" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <TopLosersList interval={type} />
      </main>
    </div>
  );
}
