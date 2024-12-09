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
import { Tabs, Tab } from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { TopCryptoList } from "@/components/home/topCrypto";
import Gainers from "../top-gainers/gainers";
import { Highlights } from "@/components/home/highlights";
import { useRouter, usePathname } from "next/navigation";
import Losers from "../top-losers/losers";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "All Coins", value: "price" },
  { label: "Gainers", value: "gainers" },
  { label: "Losers", value: "losers" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("price");
  const pathname = usePathname();
  const router = useRouter();

  const [type, setType] = useState("24h");

  const handleChange = (event: any) => {
    const newType = event.target.value;
    setType(newType);
  };

  useEffect(() => {
    // Extract tab from the URL, trim spaces, and validate against TABS
    const currentTab = pathname.split("/").pop()?.trim() || "";

    // Ensure the tab value exists in the TABS array, default to Overview (empty string)
    const isValidTab = TABS.some((tab) => tab.value === currentTab);
    setActiveTab(isValidTab ? currentTab : "");
  }, [pathname]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);

    // Append tab to URL only if it's not the default (Overview)
    if (newValue === "overview") {
      router.push(`/`);
    }
  };

  return (
    <div className="grid  justify-items-center min-h-screen  pb-20 gap-16  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Highlights />
        <div className="flex justify-between w-full">
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
          {(activeTab === "gainers" || activeTab === "losers") && (
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
          )}
        </div>
        {activeTab === "price" && <TopCryptoList />}
        {activeTab === "gainers" && <Gainers type={type} />}
        {activeTab === "losers" && <Losers type={type} />}
      </main>
    </div>
  );
}
