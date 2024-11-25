"use client";
import { TopCryptoList } from "@/components/home/topCrypto";
import { Highlights } from "../components/home/highlights";
import { useTheme } from "@/context/ThemeContext";
import { Surfing } from "@mui/icons-material";

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="grid grid-rows-[20px_1fr_20px]  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div onClick={toggleTheme}>
          <Surfing />
        </div>
        <Highlights />
        <TopCryptoList />
      </main>
    </div>
  );
}
