export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type Country = {
  currencies: Currency[];
  name: string;
  alpha2Code: string;
};

type ExchangeRate = {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: string;
};

type BanknoteRate = {
  buy: number;
  middle: number;
  sell: number;
  indicator: number;
  lastModified: string;
};

export type Fx = {
  currency: string;
  precision?: number;
  nameI18N?: string;
  exchangeRate: ExchangeRate;
  banknoteRate?: BanknoteRate;
  flags?: string[];
  denominations?: number[];
};

export type ExchangeRates = {
  institute: number;
  lastUpdated: string;
  comparisonDate: string;
  baseCurrency: string;
  fx: Fx[];
};

export type CurrencyExchangeRate = {
  country: {
    name: string;
    countryCode: string;
  };
  currency: string;
  sell?: number;
  buy?: number;
};
