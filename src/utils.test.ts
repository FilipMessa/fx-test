import {
  mapCurrenciesToCountries,
  mergeCurrenciesWithExchangeRates,
} from "./utils";
import logger from "./services/logger";

jest.mock("./services/logger", () => ({
  info: jest.fn(),
}));

const countries = [
  {
    currencies: [{ code: "AFN", name: "Afghan afghani", symbol: "؋" }],
    name: "Afghanistan",
    alpha2Code: "AF",
  },
  {
    currencies: [{ code: "USD", name: "United States dollar", symbol: "$" }],
    name: "United States of America",
    alpha2Code: "US",
  },
];

const fx = [
  {
    currency: "AFN",
    precision: 2,
    nameI18N: "Afghan Afghani",
    exchangeRate: {
      buy: 78.6653,
      middle: 86.1653,
      sell: 93.6653,
      indicator: 0,
      lastModified: "2018-11-08T23:00:00Z",
    },
    flags: ["provided"],
  },
  {
    currency: "USD",
    precision: 2,
    nameI18N: "US Dollar",
    denominations: [100, 50, 20, 10, 5, 1],
    exchangeRate: {
      buy: 1.1299,
      middle: 1.1349,
      sell: 1.1399,
      indicator: 0,
      lastModified: "2018-11-08T23:00:00Z",
    },
    banknoteRate: {
      buy: 1.131,
      middle: 1.149,
      sell: 1.167,
      indicator: 0,
      lastModified: "2018-11-06T23:00:00Z",
    },
    flags: ["provided"],
  },
];

const currencies = {
  AFN: {
    country: {
      countryCode: "AF",
      name: "Afghanistan",
    },
    name: "Afghan afghani",
    symbol: "؋",
  },
  USD: {
    country: {
      countryCode: "US",
      name: "United States of America",
    },
    name: "United States dollar",
    symbol: "$",
  },
};

describe("mapCurrenciesToCountries", () => {
  test("map currencies to countries", () => {
    const result = mapCurrenciesToCountries(countries);
    expect(result).toEqual(currencies);
  });
  it("if it receives no parameter returns an empty object", () => {
    const result = mapCurrenciesToCountries();
    expect(result).toEqual({});
  });
});

describe("mergeCurrenciesWithExchangeRates", () => {
  test("merge exchange rates data with currencies", () => {
    const result = mergeCurrenciesWithExchangeRates(fx, currencies);
    expect(result).toEqual([
      {
        buy: 78.6653,
        country: {
          countryCode: "AF",
          name: "Afghanistan",
        },
        currency: "AFN",
        sell: 93.6653,
      },
      {
        buy: 1.1299,
        country: {
          countryCode: "US",
          name: "United States of America",
        },
        currency: "USD",
        sell: 1.1399,
      },
    ]);
  });
  test("log the non-exiting currency", () => {
    const result = mergeCurrenciesWithExchangeRates(
      [
        {
          currency: "LUF",
          precision: 0,
          exchangeRate: {
            buy: 40.3399,
            middle: 40.3399,
            sell: 40.3399,
            indicator: 0,
            lastModified: "2007-10-07T22:00:00Z",
          },
          banknoteRate: {
            buy: 40.3399,
            middle: 40.3399,
            sell: 40.3399,
            indicator: 0,
            lastModified: "2008-08-06T22:00:00Z",
          },
          flags: ["provided"],
        },
      ],
      currencies
    );

    expect(result).toMatchInlineSnapshot(`Array []`);
    expect(logger.info).toBeCalledWith("The LUF currency could not be found.");
  });
});
