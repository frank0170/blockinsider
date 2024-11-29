import axios from "axios";
import { isDevelopment } from "../utils/config";

const baseURL = isDevelopment
  ? "https://d7c1-81-196-204-47.ngrok-free.app/blockinsider"
  : "https://phpstack-1372644-5063353.cloudwaysapps.com/blockinsider";

type CacheEntry = { data: any; expiration: number };

const cache = new Map<string, CacheEntry>();

const setCache = (key: string, data: any, ttl: number) => {
  const expiration = Date.now() + ttl;
  cache.set(key, { data, expiration });
};

const getCache = (key: string): any | null => {
  const entry = cache.get(key);
  if (entry && entry.expiration > Date.now()) {
    return entry.data;
  }
  // Remove expired entry
  cache.delete(key);
  return null;
};

export const getGlobalCryptoList = async () => {
  const cacheKey = "globalCryptoList";
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/global-metrics`);
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching global crypto data: ", error);
    throw error;
  }
};
export const getTopCryptoList = async (
  start: number = 1,
  limit: number = 100,
  currency: string = "USD"
) => {
  const cacheKey = `topCryptoList-${start}-${limit}-${currency}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/top-cryptos`, {
      params: { start, limit, convert: currency },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching top cryptos: ", error);
    throw error;
  }
};

export const getCoinOHLCV = async (
  coin: string,
  interval: string,
  count: number
) => {
  const cacheKey = `coinOHLCV-${coin}-${interval}-${count}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/ohlcv`, {
      params: { id: coin, interval, count },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};

export const getCoinData = async (coin: string, currency: string) => {
  const cacheKey = `coinData-${coin}-${currency}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/coin-data`, {
      params: { slug: coin, convert: currency },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coin data: ", error);
    throw error;
  }
};

export const getCoinMetadata = async (coin: string | number) => {
  const cacheKey = `coinMetadata-${coin}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/coin-metadata`, {
      params: { id: coin },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coin metadata: ", error);
    throw error;
  }
};

export const getCoinsMetadata = async () => {
  const cacheKey = "coinsMetadata";
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/coins-metadata`);
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coins metadata: ", error);
    throw error;
  }
};

export const getCoinMarket = async (
  coin: string | number,
  currency: string = "USD"
) => {
  const cacheKey = `coinMarket-${coin}-${currency}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/markets`, {
      params: { id: coin, currency },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coin market: ", error);
    throw error;
  }
};

export const getCoinNews = async (coin: string | number, page: number = 1) => {
  const cacheKey = `coinNews-${coin}-${page}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/news`, {
      params: { id: coin, page },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coin news: ", error);
    throw error;
  }
};

export const getCoinPriceRange = async (
  coin: string,
  interval: string,
  end: any
) => {
  const cacheKey = `coinPriceRange-${coin}-${interval}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/price-range`, {
      params: { id: coin, interval, start: end },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};

export const getExchanges = async () => {
  const cacheKey = `exchanges-list`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/exchanges`, {});
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching coin market: ", error);
    throw error;
  }
};

export const getHeatMap = async (start: string, limit: string) => {
  const cacheKey = `heatMap-${start}-${limit}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/heatmap`, {
      params: { start, limit },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};

export const getTopGainers = async (period: string) => {
  const cacheKey = `topGainers-${period}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/top-gainers`, {
      params: { period },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};

export const getTopLosers = async (period: string) => {
  const cacheKey = `topLosers-${period}`;
  const cachedData = getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const res = await axios.get(`${baseURL}/top-losers`, {
      params: { period },
    });
    setCache(cacheKey, res.data, 5 * 60 * 1000); // Cache for 5 minutes
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};
