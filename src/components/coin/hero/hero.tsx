// import React from "react";
// import { useTheme } from "@/context/ThemeContext";
// import LanguageIcon from "@mui/icons-material/Language";
// import ExploreIcon from "@mui/icons-material/Explore";
// import TopicIcon from "@mui/icons-material/Topic";
// import CodeIcon from "@mui/icons-material/Code";
// import { PriceRange } from "../priceRange/priceRange";

// const Hero = ({ coinData, coinMetaData }: any) => {
//   const { isDarkMode } = useTheme();

//   const style = isDarkMode
//     ? {
//         text: "text-white",
//         secondary: "text-gray-300",
//         background: "bg-[#454545]",
//         secondaryBg: "bg-[#555454]",
//       }
//     : {
//         text: "text-black",
//         secondary: "text-gray-600",
//         background: "bg-white",
//         secondaryBg: "bg-gray-400",
//       };
//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex flex-row items-center gap-[12px]">
//           <img
//             src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${coinData.id}.png`}
//             width={112}
//           />
//           <div className="flex justify-start flex-col gap-[10px]">
//             <div
//               className={`text-5xl font-semibold ${style.text} relative top-[10px]`}
//             >
//               {coinData?.name}
//               <p className={`text-xl  ${style.secondary} relative top-[-5px]`}>
//                 {coinData?.symbol}
//               </p>
//             </div>
//             <span className=" relative text-[14px] text-gray-300 top-[10px]">
//               Rank: {coinData?.cmc_rank}
//             </span>
//           </div>
//         </div>
//         <div className="w-[400px]">
//           <PriceRange coinData={coinData} currency="USD" />
//         </div>

//         <div className="text-right">
//           <span className={`text-4xl font-700 ${style.text}`}>
//             ${coinData?.quote?.USD?.price?.toLocaleString() || "N/A"}
//           </span>
//           <p className={`text-sm ${style.secondary}`}>Price in USD</p>
//         </div>
//       </div>

//       <div className="w-full flex justify-end gap-[10px] mb-[12px]">
//         <a href={coinMetaData?.urls?.website[0]} target="_blank">
//           <LanguageIcon />
//         </a>
//         <a href={coinMetaData?.urls?.explorer[0]} target="blank">
//           <ExploreIcon />
//         </a>
//         <a href={coinMetaData?.urls?.technical_doc[0]} target="blank">
//           <TopicIcon />
//         </a>
//         <a href={coinMetaData?.urls?.source_code[0]} target="blank">
//           <CodeIcon />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Hero;

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
        background: "bg-[#1E1E1E]",
        secondaryBg: "bg-[#292929]",
      }
    : {
        text: "text-customDarkPrices",
        secondary: "text-gray-600",
        background: "bg-white",
        secondaryBg: "bg-gray-200",
      };

  return (
    <div className={`w-full p-6 ${style.background} rounded-lg shadow-lg mt-8`}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-center gap-6">
        {/* Coin Information */}
      <div className="flex items-center gap-4">
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${coinData.id}.png`}
          alt={coinData?.name}
          className="w-28 h-28 object-contain"
        />
        <div className="flex flex-col">
          <h1 className={`text-4xl font-bold ${style.text}`}>
            {coinData?.name}
          </h1>
          <p className={`text-lg font-medium ${style.secondary}`}>
            {coinData?.symbol}
          </p>
          <span className={`text-sm ${style.secondary}`}>
            Rank: #{coinData?.cmc_rank}
          </span>
        </div>
      </div>

        {/* Price Info */}
        <div className="text-center md:text-right">
        <span className={`text-4xl font-bold ${style.text}`}>
            ${coinData?.quote?.USD?.price?.toLocaleString() || "N/A"}
          </span>
          <p className={`text-sm ${style.secondary}`}>Price in USD</p>
        </div>

        {/* 7-Day Range */}
        <div className="w-full md:w-[300px] p-2">
          <PriceRange coinData={coinData} currency="USD" />
        </div>
      </div>

      {/* Links Section */}
      <div className="mt-6 flex justify-end gap-4">
        <a
          href={coinMetaData?.urls?.website[0]}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xl p-2 rounded-full hover:${style.secondaryBg} transition`}
        >
          <LanguageIcon />
        </a>
        <a
          href={coinMetaData?.urls?.explorer[0]}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xl p-2 rounded-full hover:${style.secondaryBg} transition`}
        >
          <ExploreIcon />
        </a>
        <a
          href={coinMetaData?.urls?.technical_doc[0]}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xl p-2 rounded-full hover:${style.secondaryBg} transition`}
        >
          <TopicIcon />
        </a>
        <a
          href={coinMetaData?.urls?.source_code[0]}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xl p-2 rounded-full hover:${style.secondaryBg} transition`}
        >
          <CodeIcon />
        </a>
      </div>
    </div>
  );
};

export default Hero;

