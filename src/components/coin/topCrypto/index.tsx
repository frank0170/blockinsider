"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCoinMarket } from "@/api/coinMarketCap";
import { Pagination } from "@/app/shared/pagination/pagination";
import { Dropdown } from "@/app/shared/dropdown/dropdown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@/context/ThemeContext";

export const ExchangeList = ({
  coinId,
  type = "spot",
  overview = false,
}: any) => {
  const [coinMarket, setCoinMarket] = useState<any>([]);
  const [marketType, setMarketType] = useState<any>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!coinId) return;

    const fetchData = async () => {
      const res3 = await getCoinMarket(coinId);
      setCoinMarket(res3.data.market_pairs);
    };

    fetchData();
  }, [coinId]);

  useEffect(() => {
    if (!coinId) return;

    const setType = () => {
      if (coinMarket) {
        if (type === "spot") {
          setMarketType(
            coinMarket.filter((item: any) => item.category === "spot")
          );
        } else {
          setMarketType(
            coinMarket.filter((item: any) => item.category === "derivatives")
          );
        }
      }
    };

    setType();
  }, [type, coinMarket]);

  return (
    <div
      className={`w-full bg-[#${
        isDarkMode ? "454545" : "000000"
      }] p-6 rounded-lg shadow-md`}
    >
      {" "}
      <table className="w-full border-collapse text-left">
        <thead className="border-b">
          <tr>
            <th className="py-2 px-4  font-medium">Exchange</th>
            <th className="py-2 px-4 font-medium">Pair</th>
            <th className="py-2 px-4 font-medium">Last Price</th>

            {/* <th className="py-2 px-4 text-gray-700 font-medium">24h %</th>
            <th className="py-2 px-4 text-gray-700 font-medium">24h High</th>
            <th className="py-2 px-4 text-gray-700 font-medium">24h Low</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Spread</th> */}

            <th className="py-2 px-4  font-medium">Volume</th>
          </tr>
        </thead>
        <tbody>
          {overview
            ? marketType?.slice(0, 10).map((item: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 h-[80px]"
                  style={{ borderBottom: "1px solid #f7f7f7" }}
                >
                  <td className="py-2 px-4 ">
                    <div className="flex flex-row items-center gap-[8px]">
                      <img
                        src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${item.exchange.id}.png`}
                        width={28}
                      />
                      {item?.exchange?.name}
                    </div>
                  </td>
                  <td className="py-2 px-4 ">
                    <Link href={`/price/${item.symbol}`}>
                      <div className="flex flex-row items-center gap-[8px]">
                        <span className="text-500">{item?.market_pair}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="py-2 px-4 ">
                    ${item?.quote?.USD?.price?.toLocaleString()}
                  </td>

                  {/* <td className="py-2 px-4 text-gray-800">
                {changeFormater(item.quote?.USD?.volume_24h)}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {changeFormater(item.quote?.USD?.percent_change_7d)}
              </td>
              <td className="py-2 px-4 text-gray-800">
                ${item.quote?.USD?.market_cap.toLocaleString()}
              </td> */}

                  <td className="py-2 px-4 ">
                    <div className="flex flex-col">
                      <span>
                        $
                        {item.quote?.exchange_reported?.volume_24h_quote.toLocaleString()}
                      </span>
                      <span className="text-[#b4b4b4] text-[14px]">
                        {(item.quote?.exchange_reported?.volume_24h_base).toLocaleString()}{" "}
                        <span className="text-[#b4b4b4] text-[14px]">
                          {item?.market_pair_base?.currency_symbol}
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            : marketType?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 h-[80px]"
                  style={{ borderBottom: "1px solid #f7f7f7" }}
                >
                  <td className="py-2 px-4 ">
                    <div className="flex flex-row items-center gap-[8px]">
                      <img
                        src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${item.exchange.id}.png`}
                        width={28}
                      />
                      {item?.exchange?.name}
                    </div>
                  </td>
                  <td className="py-2 px-4 ">
                    <Link href={`/price/${item.symbol}`}>
                      <div className="flex flex-row items-center gap-[8px]">
                        <span className="text-500">{item?.market_pair}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="py-2 px-4 ">
                    ${item?.quote?.USD?.price?.toLocaleString()}
                  </td>

                  {/* <td className="py-2 px-4 text-gray-800">
                {changeFormater(item.quote?.USD?.volume_24h)}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {changeFormater(item.quote?.USD?.percent_change_7d)}
              </td>
              <td className="py-2 px-4 text-gray-800">
                ${item.quote?.USD?.market_cap.toLocaleString()}
              </td> */}

                  <td className="py-2 px-4 ">
                    <div className="flex flex-col">
                      <span>
                        $
                        {item.quote?.exchange_reported?.volume_24h_quote.toLocaleString()}
                      </span>
                      <span className="text-[#b4b4b4] text-[14px]">
                        {(item.quote?.exchange_reported?.volume_24h_base).toLocaleString()}{" "}
                        <span className="text-[#b4b4b4] text-[14px]">
                          {item?.market_pair_base?.currency_symbol}
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
