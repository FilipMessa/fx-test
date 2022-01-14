import { useEffect, useState } from "react";
import axios from "axios";

import { API } from "../consts";
import logger from "../services/logger";
import { Country, ExchangeRates } from "../types";

type Data = {
  countries: Country[];
  exchangeRates: ExchangeRates;
} | null;

export const useFetchCurenciesData = () => {
  const [data, setData] = useState<Data>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const resp = await Promise.all([
          axios.get<Country[]>(API.countries),
          axios.get<ExchangeRates>(API.exchangeRates),
        ]);

        setData({
          countries: resp[0].data,
          exchangeRates: resp[1].data,
        });
      } catch (err) {
        logger.error(err);
        setHasError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { data, hasError, isLoading };
};
