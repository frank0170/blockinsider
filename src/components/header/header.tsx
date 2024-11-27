import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Surfing from "@mui/icons-material/Surfing";

const Header = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <header className="bg-white-900 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className={`text-xl font-bold text-${isDarkMode ? "white" : "black"}`}
        >
          BlockInsider
        </h1>

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

        <div onClick={toggleTheme}>
          <Surfing sx={{ color: isDarkMode ? "white" : "black" }} />
        </div>
      </div>
    </header>
  );
};

export default Header;
