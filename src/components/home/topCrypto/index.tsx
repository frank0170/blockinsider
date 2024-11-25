"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTopCryptoList } from "@/api/coinMarketCap";
import { Pagination } from "@/app/shared/pagination/pagination";
import { Dropdown } from "@/app/shared/dropdown/dropdown";
import { testCrypto } from "../../../utils/mock";

export const TopCryptoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number>(10);
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
      const res = await getTopCryptoList();
      setCoinsList(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full bg-white">
      <table className="w-full border-collapse text-left">
        <thead className="border-b">
          <tr>
            <th className="py-2 px-4 text-gray-700 font-medium">Rank</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Name</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Price</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Change</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Market Cap</th>
            <th className="py-2 px-4 text-gray-700 font-medium">Volume</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item: any, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-800">{item.cmc_rank}</td>
              <td className="py-2 px-4 text-gray-800">
                <Link href={`/coin/${item.symbol}`}>
                  <div className="flex flex-col">
                    {item.name} {item.symbol}
                  </div>
                </Link>
              </td>
              <td className="py-2 px-4 text-gray-800">
                ${item?.quote?.USD?.price?.toLocaleString()}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {item.quote?.USD?.percent_change_24h.toLocaleString()}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {item.quote?.USD?.market_cap.toLocaleString()}
              </td>
              <td className="py-2 px-4 text-gray-800">
                {item.quote?.USD?.volume_24h.toLocaleString()}
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
