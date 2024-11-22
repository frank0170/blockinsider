import axios, { AxiosResponse } from "axios";
import { isDevelopment } from "../utils/config";

const coinMarketCapApi = isDevelopment
  ? "http://localhost:5050/blockinsider"
  : "api/blockinsider";

const fetchCoinMarketCapApi = async (endpoint: string, params: any | null) => {
  try {
    const res = await axios.get(`${coinMarketCapApi}?endpoint=${endpoint}`, {
      params: {
        ...params,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

export const getGlobalCryptoList = async () => {
  const params = {};
  const endpoint = "v1/global-metrics/quotes/latest";
  return await fetchCoinMarketCapApi(endpoint, params);
};

export const getTopCryptoList = async (
  start: number = 1,
  limit: number = 100,
  currency: string = "USD"
) => {
  const params = {};
  const endpoint = "v1/cryptocurrency/listings/latest";
  const endpointArgs = `?start=${start}&limit=${limit}&convert=${currency}`;
  const finalEndpoint = `${endpoint}${endpointArgs}`;
  return await fetchCoinMarketCapApi(finalEndpoint, params);
};

export const getCoinOHLCV = async (coin: string, count: number) => {
  const params = {};
  const endpoint = "v2/cryptocurrency/ohlcv/historical";
  const endpointArgs = `?symbol=${coin}&count=${count}`;
  const finalEndpoint = `${endpoint}${endpointArgs}`;
  return await fetchCoinMarketCapApi(finalEndpoint, params);
};

export const getCoinData = async (coin: string, currency: string) => {
  const params = {};
  const endpoint = "v1/cryptocurrency/quotes/latest";
  const endpointArgs = `?symbol=${coin}&convert=${currency}`;
  const finalEndpoint = `${endpoint}${endpointArgs}`;
  return await fetchCoinMarketCapApi(finalEndpoint, params);
};

export const getCoinMetadata = async (coin: string) => {
  const params = {};
  const endpoint = "v1/cryptocurrency/info";
  const endpointArgs = `?symbol=${coin}`;
  const finalEndpoint = `${endpoint}${endpointArgs}`;
  return await fetchCoinMarketCapApi(finalEndpoint, params);
};

export const getCoinsMetadata = async () => {
  const params = {};
  const endpoint = "v1/cryptocurrency/info";
  return await fetchCoinMarketCapApi(endpoint, params);
};
