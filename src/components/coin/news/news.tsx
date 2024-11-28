import React, { useEffect, useState } from "react";
import { Typography, Link } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

type NewsItem = {
  title: string;
  source: { title: string };
  published_at: string;
  url: string;
};

type TransformedNewsItem = {
  title: string;
  source: string;
  date: string;
  url: string;
};

const CryptoNews = ({
  news,
  symbol,
  overview,
}: {
  news: NewsItem[];
  symbol: string;
  overview?: boolean;
}) => {
  const [newsArray, setNewsArray] = useState<TransformedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  function formatDate(publishedAt: string) {
    const publishedDate = new Date(publishedAt);

    const day = publishedDate.getDate().toString().padStart(2, "0");
    const month = (publishedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = publishedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchNews = async () => {
      const topNews = news.map((newsItem) => ({
        title: newsItem.title,
        source: newsItem.source.title || "No description available.",
        date: formatDate(newsItem.published_at),
        url: newsItem.url,
      }));

      if (overview) {
        setNewsArray(topNews.slice(0, 5));
      } else {
        setNewsArray(topNews);
      }

      setLoading(false);
    };

    fetchNews();
  }, [symbol, news]);

  return (
    <div
      className={`w-full bg-[#${
        isDarkMode ? "454545" : "000000"
      }] p-6 rounded-lg shadow-md`}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div className="space-y-4">
          {newsArray.map((item, index) => (
            <div
              key={index}
              className={`bg-[#${
                isDarkMode ? "555454" : "000000"
              }] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
            >
              <Typography
                variant="subtitle1"
                className={`text-blue-${isDarkMode ? "100" : "600"}`}
              >
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {item.title}
                </Link>
              </Typography>
              <Typography variant="body2" className="">
                {item.source} - {item.date}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoNews;
