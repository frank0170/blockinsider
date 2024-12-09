"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTopCryptoList } from "@/api/coinMarketCap";
import { useTheme } from "@/context/ThemeContext";
import { Pagination } from "@/app/shared/pagination/pagination";
import { Dropdown } from "@/app/shared/dropdown/dropdown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const TopCryptoList = () => {
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
      const res = await getTopCryptoList(1, 300);
      setCoinsList(res.data);

      console.log(res.data);
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
    <div
      className={`w-full bg-[#${
        isDarkMode ? "454545" : "000000"
      }] rounded-lg shadow-md`}
    >
      <table className="w-full border-collapse table-auto text-left">
        <thead className="border-b">
          <tr>
            <th className={`${tableText} text-left`}>Rank</th>
            <th className={`${tableText} text-left`}>Name</th>
            <th className={`${tableText} text-left`}>Price</th>
            <th className={`${tableText} text-left`}>24h %</th>
            <th className={`${tableText} text-left`}>7d %</th>
            <th className={`${tableText} text-left`}>Market Cap</th>
            <th className={`${tableText} text-left`}>Volume 24h</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item: any, index) => (
            <tr
              key={index}
              className={`${activeItem} border-b border-gray-200`}
            >
              <td className="py-2 px-4 text-[#a5a5a5]">#{item.cmc_rank}</td>
              <td className={tableItem}>
                <Link href={`/price/${item.slug}`} prefetch={true}>
                  <div className="flex flex-row items-center gap-[8px]">
                    <img
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
                      width={28}
                      alt={item.name}
                    />
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-[#b4b4b4] ml-1">{item.symbol}</span>
                    </div>
                  </div>
                </Link>
              </td>
              <td className={tableItem}>
                ${item?.quote?.USD?.price?.toLocaleString()}
              </td>
              <td className={tableItem}>
                {changeFormater(item.quote?.USD?.percent_change_24h)}
              </td>
              <td className={tableItem}>
                {changeFormater(item.quote?.USD?.percent_change_7d)}
              </td>
              <td className={tableItem}>
                ${item.quote?.USD?.market_cap.toLocaleString()}
              </td>
              <td className={tableItem}>
                <div className="flex flex-col">
                  <span>${item.quote?.USD?.volume_24h.toLocaleString()}</span>
                  <span className="text-[#b4b4b4] text-[14px]">
                    {(
                      item.quote?.USD?.volume_24h / item?.quote?.USD?.price
                    ).toLocaleString()}{" "}
                    {item.symbol}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row gap-[40px] justify-center my-[24px]">
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
