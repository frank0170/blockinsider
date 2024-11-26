import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Typography, Link } from "@mui/material";

// API Keys
const CMC_API_KEY = "your-cmc-api-key";
const CRYPTOPANIC_API_KEY = "your-cryptopanic-api-key";

// URLs
const CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info";
const NEWS_URL = "https://cryptopanic.com/api/v1/posts/";

const CryptoNews = ({ news, symbol, overview }: any) => {
  const [newsArray, setNewsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatDate(publishedAt: any) {
    const publishedDate = new Date(publishedAt);

    // If the date is older than 10 days, format as dd/mm/yyyy
    const day = publishedDate.getDate().toString().padStart(2, "0");
    const month = (publishedDate.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const year = publishedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchNews = async () => {
      const topNews = news.map((newsItem: any) => ({
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div className="space-y-4">
          {newsArray.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Typography variant="subtitle1" className="text-blue-600">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {item.title}
                </Link>
              </Typography>
              <Typography variant="body2" className="text-gray-600">
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
