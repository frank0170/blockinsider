"use client";
// import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
// import { ThemeProvider } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import theme, { darkTheme, lightTheme } from "../utils/theme";
import { getTopCryptoList } from "@/api/coinMarketCap";
import { ThemeProvider } from "../context/ThemeContext";
import localFont from "next/font/local";
import "./globals.css";
import { useTheme } from "../context/ThemeContext";
import Surfing from "@mui/icons-material/Surfing";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "BlockInsider",
//   description: "BlockInsider main app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          {/* <ThemeProvider theme={lightTheme}> */}
          <ThemeProvider>
            <header className="bg-white-900 text-white py-4 px-6">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-black">BlockInsider</h1>

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
              </div>
            </header>
            <hr style={{ height: "1px", background: "black" }} />
            <main>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
