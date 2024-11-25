import axios from "axios";
import { isDevelopment } from "../utils/config";

const baseURL = isDevelopment
  ? "http://localhost:5050/blockinsider"
  : "api/blockinsider";

export const getGlobalCryptoList = async () => {
  try {
    const res = await axios.get(`${baseURL}/global-metrics`);
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
  try {
    const res = await axios.get(`${baseURL}/top-cryptos`, {
      params: { start, limit, convert: currency },
    });
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
  try {
    const res = await axios.get(`${baseURL}/ohlcv`, {
      params: { id: coin, interval, count },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching OHLCV data: ", error);
    throw error;
  }
};

export const getCoinData = async (coin: string, currency: string) => {
  try {
    const res = await axios.get(`${baseURL}/coin-data`, {
      params: { symbol: coin, convert: currency },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching coin data: ", error);
    throw error;
  }
};

export const getCoinMetadata = async (coin: string) => {
  try {
    const res = await axios.get(`${baseURL}/coin-metadata`, {
      params: { symbol: coin },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching coin metadata: ", error);
    throw error;
  }
};

export const getCoinsMetadata = async () => {
  try {
    const res = await axios.get(`${baseURL}/coins-metadata`);
    return res.data;
  } catch (error) {
    console.error("Error fetching coins metadata: ", error);
    throw error;
  }
};
