import { render, act } from "@testing-library/react";
import { useSearchExchangeRate } from "./useSearchExchangeRate";
import { BrowserRouter } from "react-router-dom";
import { CurrencyExchangeRate } from "../types";

function setup(data: CurrencyExchangeRate[]): any {
  jest.mock("react-router-dom", () => {
    let searchTerm = "CZK";
    return {
      ...jest.requireActual("react-router-dom"),
      useSearchParams: () => [
        {
          get: jest.fn(() => searchTerm),
        },
        jest.fn((value: any = {}) => {
          searchTerm = value.search;
        }),
      ],
    };
  });

  const returnVal = {};
  function TestComponent() {
    Object.assign(returnVal, useSearchExchangeRate(data));
    return null;
  }
  render(
    <BrowserRouter>
      <TestComponent />
    </BrowserRouter>
  );
  return returnVal;
}

const data = [
  {
    country: {
      name: "Comoros",
      countryCode: "KM",
    },
    currency: "KMF",
  },
  {
    country: {
      name: "Czech Republic",
      countryCode: "CZ",
    },
    currency: "CZK",
    sell: 26.275,
    buy: 25.575,
  },
];

test("useSearchExchangeRate hook", () => {
  const useSearchExchangeRate = setup(data);

  expect(useSearchExchangeRate.searchTerm).toBe("");
  expect(useSearchExchangeRate.searchedRates).toEqual(data);

  act(() => {
    useSearchExchangeRate.handleSearch(data[1].currency);
  });

  expect(useSearchExchangeRate.searchTerm).toBe(data[1].currency);
  expect(useSearchExchangeRate.searchedRates).toEqual([data[1]]);

  act(() => {
    useSearchExchangeRate.handleSearch(data[0].country.name);
  });

  expect(useSearchExchangeRate.searchTerm).toBe(data[0].country.name);
  expect(useSearchExchangeRate.searchedRates).toEqual([data[0]]);
});
