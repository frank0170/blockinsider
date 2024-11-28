"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  use,
} from "react";
import { getCoinNews } from "@/api/coinMarketCap";
import CryptoNews from "@/components/coin/news/news";

export default function Page({ params }: any) {
  const { _symbol } = use<any>(params);
  const [coin, setCoin] = useState<string>(_symbol);
  const [coinNews, setCoinNews] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1); // Track the current page
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there is more news

  useEffect(() => {
    if (_symbol) {
      setCoin(_symbol);
    }
  }, [_symbol]);

  // Fetch the news based on the current page
  const fetchNews = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent multiple API calls if already loading or no more news

    setLoading(true);
    try {
      const response = await getCoinNews(coin, page);
      if (response.results && response.results.length > 0) {
        setCoinNews((prevNews) => [...prevNews, ...response.results]);
        setPage((prevPage) => prevPage + 1); // Increment page number for next API call
      } else {
        setHasMore(false); // No more news to load
      }
    } catch (error) {
      console.error("Error loading more news:", error);
    } finally {
      setLoading(false);
    }
  }, [coin, page, loading, hasMore]);

  // Initial load of news when component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="w-full">
      {/* Main container */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold  mb-4">Latest News</h2>
        <CryptoNews news={coinNews} symbol={coin} />

        {/* Load More Button */}
        {loading && <p>Loading more...</p>}
        {!hasMore && <p>No more news to load</p>}
        {hasMore && !loading && (
          <button
            onClick={fetchNews}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mx-auto"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
