"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getExchanges } from "@/api/coinMarketCap";
import { useTheme } from "@/context/ThemeContext";
import { Pagination } from "@/app/shared/pagination/pagination";
import { Dropdown } from "@/app/shared/dropdown/dropdown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatValuePrices } from "@/utils/numbers";
import { ExchangeRange } from "../priceRange/priceRange";
import _ from "lodash";

export const TopExchangeList = ({ type }: any) => {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number>(50);
  const options = [5, 10, 50, 100];

  const [coinsList, setCoinsList] = useState([]);
  const totalItems = coinsList.length;
  const itemsPerPage = selectedOption;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = coinsList.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getExchanges();

      const totalVolume = res.data.reduce(
        (sum, exchange) => sum + exchange.quote?.USD?.volume_24h,
        0
      );

      // Add market share to each exchange
      const dataWithMarketShare = res.data.map((exchange) => ({
        ...exchange,
        market_share: (
          (exchange.quote?.USD?.volume_24h / totalVolume) *
          100
        ).toFixed(2), // Market share in percentage
      }));

      const filteredData = dataWithMarketShare.filter(
        (item) => item.num_market_pairs != -1
      );

      const sortedData = _.orderBy(
        filteredData,
        ["quote.traffic_score"],
        ["desc"]
      );
      setCoinsList(sortedData);
    };

    fetchData();
  }, []);
  const changeFormater = (value: number) => {
    if (value > 0) {
      return (
        <div className="flex items-center">
          <ArrowDropUpIcon sx={{ color: "#2d9b00" }} />

          <span className="text-[#2d9b00]">{value.toFixed(2)}%</span>
        </div>
      );
    } else if (value < 0) {
      return (
        <div className="flex items-center">
          <ArrowDropDownIcon sx={{ color: "#ee0000" }} />

          <span className="text-[#ee0000]">{value.toFixed(2)}%</span>
        </div>
      );
    } else {
      return <span className="text-gray-800">{value.toFixed(2)}%</span>;
    }
  };

  const tableText = isDarkMode
    ? "py-2 px-4 text-[#e0e0e0] font-medium"
    : "py-2 px-4 text-gray-700 font-medium";

  const tableItem = isDarkMode
    ? "py-2 px-4 text-[#e0e0e0] "
    : "py-2 px-4 text-gray-800";

  const activeItem = isDarkMode
    ? "hover:bg-gray-600 h-[80px]"
    : "hover:bg-gray-100 h-[80px]";

  return (
    <div className={`w-full bg-[#${isDarkMode ? "454545" : "000000"}]`}>
      <table className="w-full border-collapse text-left">
        <thead className="border-b">
          <tr>
            <th className={tableText}>Rank</th>
            <th className={tableText}>Name</th>
            <th className={tableText}>Pairs</th>
            <th className={tableText}>Trading Volume 24h</th>
            <th className={tableText}>Market Share</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item: any, index) => (
            <tr
              key={index}
              className={activeItem}
              style={{ borderBottom: "1px solid #f7f7f7" }}
            >
              <td className="py-2 px-4 text-[#a5a5a5]">#{item.rank}</td>
              <td className={tableItem}>
                <Link href={`/price/${item.slug}/overview`} prefetch={true}>
                  <div className="flex flex-row items-center gap-[8px]">
                    <img
                      src={`https://s2.coinmarketcap.com/static/img/exchanges/128x128/${item.id}.png`}
                      width={28}
                    />
                    <span className="text-500">{item.name}</span>
                    <span className="text-[#b4b4b4]">{item.symbol}</span>
                  </div>
                </Link>
              </td>
              <td className={tableItem}>{item?.num_market_pairs}</td>
              <td className={tableItem}>
                ${formatValuePrices(item?.quote?.USD[`${type}_volume`])}
              </td>
              <td className={tableItem}>
                <ExchangeRange coinData={item?.market_share} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row gap-[40px] justify-center mt-[24px]">
        {" "}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={(option) => {
            setSelectedOption(option);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};
