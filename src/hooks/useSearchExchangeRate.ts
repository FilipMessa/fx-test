import { useSearchParams } from "react-router-dom";

import { CurrencyExchangeRate } from "../types";
import { URL_SEARCH_PARAM } from "../consts";

export const useSearchExchangeRate = (
  exchangeRates: CurrencyExchangeRate[]
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get(URL_SEARCH_PARAM) ?? "";

  const handleSearch = (value: string) => {
    setSearchParams(value ? { [URL_SEARCH_PARAM]: value } : {});
  };

  const searchedRates = exchangeRates.filter(
    (rate) =>
      rate.country.name
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      rate.currency.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return {
    handleSearch,
    searchTerm,
    searchedRates,
  };
};
