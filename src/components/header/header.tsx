// import React from "react";
// import { useTheme } from "@/context/ThemeContext";
// import Surfing from "@mui/icons-material/Surfing";
// import { useRouter } from "next/navigation";

// const Header = () => {
//   const { toggleTheme, isDarkMode } = useTheme();
//   const router = useRouter();

//   return (
//     <header className="bg-white-900 text-white py-4 px-6">
//       <div className="container mx-auto flex justify-between items-center">
//         <div onClick={() => router.push(`/`)} className="cursor-pointer">
//           <h1
//             className={`text-xl font-bold text-${
//               isDarkMode ? "white" : "black"
//             }`}
//           >
//             BlockInsider
//           </h1>
//         </div>

//         {/* <nav>
//     <ul className="flex space-x-4">
//       <li>
//         <a href="/" className="hover:underline">
//           Home
//         </a>
//       </li>
//       <li>
//         <a href="/about" className="hover:underline">
//           About
//         </a>
//       </li>
//       <li>
//         <a href="/contact" className="hover:underline">
//           Contact
//         </a>
//       </li>
//     </ul>
//   </nav> */}
//         <div className="flex gap-[20px]">
//           <div onClick={() => router.push(`/price`)} className="cursor-pointer">
//             <h1
//               className={`text-lg font-500 text-${
//                 isDarkMode ? "white" : "black"
//               }`}
//             >
//               Top Crypto
//             </h1>
//           </div>

//           <div
//             onClick={() => router.push(`/exchanges`)}
//             className="cursor-pointer"
//           >
//             <h1
//               className={`text-lg font-500 text-${
//                 isDarkMode ? "white" : "black"
//               }`}
//             >
//               Exchanges
//             </h1>
//           </div>

//           <div
//             onClick={() => router.push(`/top-gainers`)}
//             className="cursor-pointer"
//           >
//             <h1
//               className={`text-lg font-500 text-${
//                 isDarkMode ? "white" : "black"
//               }`}
//             >
//               Top Gainers
//             </h1>
//           </div>

//           <div
//             onClick={() => router.push(`/top-losers`)}
//             className="cursor-pointer"
//           >
//             <h1
//               className={`text-lg font-500 text-${
//                 isDarkMode ? "white" : "black"
//               }`}
//             >
//               Top Losers
//             </h1>
//           </div>

//           <div
//             onClick={() => router.push(`/heatmap`)}
//             className="cursor-pointer"
//           >
//             <h1
//               className={`text-lg font-500 text-${
//                 isDarkMode ? "white" : "black"
//               }`}
//             >
//               Heatmap
//             </h1>
//           </div>

//           <div onClick={toggleTheme}>
//             <Surfing sx={{ color: isDarkMode ? "white" : "black" }} />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExchangeIcon from "@mui/icons-material/SyncAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const router = useRouter();
  const { toggleTheme, isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Top Crypto", path: "/price", icon: <TrendingUpIcon /> },
    { label: "Exchanges", path: "/exchanges", icon: <ExchangeIcon /> },
    { label: "Top Gainers", path: "/top-gainers", icon: <AssessmentIcon /> },
    { label: "Top Losers", path: "/top-losers", icon: <LocalFireDepartmentIcon /> },
    { label: "Heatmap", path: "/heatmap", icon: <ThermostatIcon /> },
  ];

  const navbarStyles = isDarkMode
    ? "bg-black text-white"
    : "bg-white text-black";

  const menuButtonStyles = isDarkMode ? "text-white" : "text-black";

  return (
    <header className={`fixed top-0 left-0 w-full shadow-md z-50 ${navbarStyles}`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          onClick={() => router.push(`/`)}
          className="cursor-pointer text-2xl font-bold"
        >
          BlockInsider
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`text-3xl focus:outline-none ${menuButtonStyles}`}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-lg font-medium">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer flex items-center gap-2 hover:underline hover:text-gray-500 transition-colors`}
            >
              <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
          {/* Light/Dark Mode Toggle */}
          <div
            onClick={toggleTheme}
            className="cursor-pointer flex items-center justify-center"
          >
            {isDarkMode ? (
              <LightModeIcon sx={{ color: "#FFD700", fontSize: "24px" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#000000", fontSize: "24px" }} />
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`fixed top-0 left-0 w-full h-full ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          } z-40 flex flex-col`}
        >
          {/* Close Button */}
          <div className="flex justify-between items-center px-6 py-4 shadow-md">
            <div
              onClick={() => router.push(`/`)}
              className="cursor-pointer text-2xl font-bold"
            >
              BlockInsider
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl focus:outline-none"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col items-center justify-center flex-grow gap-6 text-lg font-medium">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push(item.path);
                  setIsMenuOpen(false); // Close menu on click
                }}
                className="cursor-pointer flex items-center gap-4 hover:underline hover:text-gray-500 transition-colors"
              >
                <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                  {item.icon}
                </div>
                {item.label}
              </div>
            ))}
          </nav>

          {/* Light/Dark Mode Toggle */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <div
              onClick={toggleTheme}
              className="cursor-pointer flex items-center justify-center gap-2"
            >
              {isDarkMode ? (
                <LightModeIcon sx={{ color: "#FFD700", fontSize: "30px" }} />
              ) : (
                <DarkModeIcon  sx={{ color: "#000000", fontSize: "30px" }} />
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;





