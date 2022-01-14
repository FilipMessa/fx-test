import { createContext, ReactNode, useMemo } from "react";

import { useFetchCurenciesData } from "../hooks/useFetchCurenciesData";
import { useSearchExchangeRate } from "../hooks/useSearchExchangeRate";
import { Fx, CurrencyExchangeRate } from "../types";
import {
  mapCurrenciesToCountries,
  mergeCurrenciesWithExchangeRates,
} from "../utils";

type Context = {
  onSearch: (term: string) => void;
  exchangeRates: CurrencyExchangeRate[] | null;
  searchTerm: string | null;
  baseCurrency: string | null;
  hasError: boolean;
  isLoading: boolean;
};

type ExchangeRateContexProviderProps = {
  children: ReactNode;
};

const defaultValue: Context = {
  onSearch: () => {},
  exchangeRates: null,
  searchTerm: null,
  hasError: false,
  isLoading: false,
  baseCurrency: null,
};

export const ExchangeRateContext = createContext<Context>(defaultValue);

export const ExchangeRateContextProvider = ({
  children,
}: ExchangeRateContexProviderProps) => {
  const { data, hasError, isLoading } = useFetchCurenciesData();

  const exchangeRates = useMemo(() => {
    const filterOutBaseCurrencyRate = (fx: Fx) =>
      fx.currency !== data?.exchangeRates?.baseCurrency;

    const fx = data?.exchangeRates?.fx.filter(filterOutBaseCurrencyRate);
    const currenciesOfCountries = mapCurrenciesToCountries(data?.countries);

    return mergeCurrenciesWithExchangeRates(fx, currenciesOfCountries).sort(
      (rateA, rateB) => rateA.country.name.localeCompare(rateB.country.name)
    );
  }, [data]);

  const { handleSearch, searchedRates, searchTerm } =
    useSearchExchangeRate(exchangeRates);

  return (
    <ExchangeRateContext.Provider
      value={{
        onSearch: handleSearch,
        exchangeRates: searchedRates,
        searchTerm,
        hasError,
        isLoading,
        baseCurrency: data?.exchangeRates.baseCurrency ?? null,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};
