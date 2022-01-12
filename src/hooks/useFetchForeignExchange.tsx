import { useFetch } from "./useFetch";
import { api } from "../consts";

interface ExchangeRate {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: Date;
}

interface BanknoteRate {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: Date;
}

export interface Fx {
  currency: string;
  precision: number;
  nameI18N: string;
  exchangeRate: ExchangeRate;
  banknoteRate: BanknoteRate;
  flags: string[];
  denominations: number[];
}

export interface Data {
  institute: number;
  lastUpdated: Date;
  comparisonDate: Date;
  baseCurrency: string;
  fx: Fx[];
}

export function useFetchForeignExchange() {
  return useFetch<Data>({ url: api.foreignExchange });
}
