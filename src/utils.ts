import { Country, Fx, CurrencyExchangeRate } from "./types";

import logger from "./services/logger";

type Currencies = {
  [key: string]: {
    name: string;
    symbol: string;
    country: {
      name: string;
      countryCode: string;
    };
  };
};

export function mapCurrenciesToCountries(countries: Country[] = []) {
  return countries.reduce<Currencies>((acc, country) => {
    const data = country.currencies.reduce(
      (acc, currency) => ({
        ...acc,
        [currency.code]: {
          name: currency.name,
          symbol: currency.symbol,
          country: {
            name: country.name,
            countryCode: country.alpha2Code,
          },
        },
      }),
      {}
    );

    return { ...acc, ...data };
  }, {});
}

export function mergeCurrenciesWithExchangeRates(
  fx: Fx[] = [],
  currencies: Currencies
) {
  return fx.reduce<CurrencyExchangeRate[]>(
    (acc, { currency, exchangeRate }) => {
      const country = currencies[currency]?.country;
      if (country) {
        return [
          ...acc,
          {
            country,
            currency: currency,
            sell: exchangeRate?.sell,
            buy: exchangeRate?.buy,
          },
        ];
      } else {
        logger.info(`The ${currency} currency could not be found.`);
      }
      return acc;
    },
    []
  );
}
