import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Surfing from "@mui/icons-material/Surfing";
import { useRouter } from "next/navigation";

const Header = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <header className="bg-white-900 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={() => router.push(`/`)} className="cursor-pointer">
          <h1
            className={`text-xl font-bold text-${
              isDarkMode ? "white" : "black"
            }`}
          >
            BlockInsider
          </h1>
        </div>

        {/* <nav>
    <ul className="flex space-x-4">
      <li>
        <a href="/" className="hover:underline">
          Home
        </a>
      </li>
      <li>
        <a href="/about" className="hover:underline">
          About
        </a>
      </li>
      <li>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </li>
    </ul>
  </nav> */}
        <div className="flex gap-[20px]">
          <div onClick={() => router.push(`/price`)} className="cursor-pointer">
            <h1
              className={`text-lg font-500 text-${
                isDarkMode ? "white" : "black"
              }`}
            >
              Top Crypto
            </h1>
          </div>

          <div
            onClick={() => router.push(`/exchanges`)}
            className="cursor-pointer"
          >
            <h1
              className={`text-lg font-500 text-${
                isDarkMode ? "white" : "black"
              }`}
            >
              Exchanges
            </h1>
          </div>

          <div
            onClick={() => router.push(`/top-gainers`)}
            className="cursor-pointer"
          >
            <h1
              className={`text-lg font-500 text-${
                isDarkMode ? "white" : "black"
              }`}
            >
              Top Gainers
            </h1>
          </div>

          <div
            onClick={() => router.push(`/top-losers`)}
            className="cursor-pointer"
          >
            <h1
              className={`text-lg font-500 text-${
                isDarkMode ? "white" : "black"
              }`}
            >
              Top Losers
            </h1>
          </div>

          <div
            onClick={() => router.push(`/heatmap`)}
            className="cursor-pointer"
          >
            <h1
              className={`text-lg font-500 text-${
                isDarkMode ? "white" : "black"
              }`}
            >
              Heatmap
            </h1>
          </div>

          <div onClick={toggleTheme}>
            <Surfing sx={{ color: isDarkMode ? "white" : "black" }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
