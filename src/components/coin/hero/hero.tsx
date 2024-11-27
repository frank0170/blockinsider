import React from "react";
import { useTheme } from "@/context/ThemeContext";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import TopicIcon from "@mui/icons-material/Topic";
import CodeIcon from "@mui/icons-material/Code";
import { PriceRange } from "../priceRange/priceRange";

const Hero = ({ coinData, coinMetaData }: any) => {
  const { isDarkMode } = useTheme();

  const style = isDarkMode
    ? {
        text: "text-white",
        secondary: "text-gray-300",
        background: "bg-[#454545]",
        secondaryBg: "bg-[#555454]",
      }
    : {
        text: "text-black",
        secondary: "text-gray-600",
        background: "bg-white",
        secondaryBg: "bg-gray-400",
      };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-row items-center gap-[12px]">
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${coinData.id}.png`}
            width={112}
          />
          <div className="flex justify-start flex-col gap-[10px]">
            <div
              className={`text-5xl font-semibold ${style.text} relative top-[10px]`}
            >
              {coinData?.name}
              <p className={`text-xl  ${style.secondary} relative top-[-5px]`}>
                {coinData?.symbol}
              </p>
            </div>
            <span className=" relative text-[14px] text-gray-300 top-[10px]">
              Rank: {coinData?.cmc_rank}
            </span>
          </div>
        </div>
        <div className="w-[400px]">
          <PriceRange coinData={coinData} currency="USD" />
        </div>

        <div className="text-right">
          <span className={`text-4xl font-700 ${style.text}`}>
            ${coinData?.quote?.USD?.price?.toLocaleString() || "N/A"}
          </span>
          <p className={`text-sm ${style.secondary}`}>Price in USD</p>
        </div>
      </div>

      <div className="w-full flex justify-end gap-[10px] mb-[12px]">
        <a href={coinMetaData?.urls?.website[0]} target="_blank">
          <LanguageIcon />
        </a>
        <a href={coinMetaData?.urls?.explorer[0]} target="blank">
          <ExploreIcon />
        </a>
        <a href={coinMetaData?.urls?.technical_doc[0]} target="blank">
          <TopicIcon />
        </a>
        <a href={coinMetaData?.urls?.source_code[0]} target="blank">
          <CodeIcon />
        </a>
      </div>
    </div>
  );
};

export default Hero;
