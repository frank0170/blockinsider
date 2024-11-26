import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import TopicIcon from "@mui/icons-material/Topic";
import CodeIcon from "@mui/icons-material/Code";

const Hero = ({ coinData, coinMetaData }: any) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {coinData?.name}
            <p className="text-lg text-gray-500">{coinData?.symbol}</p>
          </h1>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-800">
            ${coinData?.quote?.USD?.price?.toLocaleString() || "N/A"}
          </span>
          <p className="text-sm text-gray-500">Price in USD</p>
        </div>
      </div>

      <div className="w-full flex justify-end gap-[10px] mb-[12px]">
        <a href={coinMetaData?.urls?.website[0]} target="blank">
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
