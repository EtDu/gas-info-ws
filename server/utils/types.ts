import { AxiosResponse } from "axios"

export type EthereumPriceData = {
  price: string;
};

export type EthereumGasPriceData = {
  slow: string;
  med: string;
  fast: string;
  base: string;
  lastBlock: string;
};

interface EtherscanPriceResult {
  ethbtc: string
  ethbtc_timestamp: string
  ethusd: string
  ethusd_timestamp: string
}

interface EtherscanGasPriceResult {
  LastBlock: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
  suggestBaseFee: string;
}

export interface EtherscanPriceResponse<T = any, D = any> extends AxiosResponse<{ result: EtherscanPriceResult }, D> { }
export interface EtherscanGasPriceResponse<T = any, D = any> extends AxiosResponse<{ result: EtherscanGasPriceResult }, D> { }