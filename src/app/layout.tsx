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
import Surfing from "@mui/icons-material/Surfing";
import Header from "@/components/header/header";

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
            <Header />
            <hr style={{ height: "1px", background: "black" }} />
            <main>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
