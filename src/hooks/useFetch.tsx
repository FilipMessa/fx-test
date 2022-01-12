import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = <R extends any = any>({ url }: { url: string }) => {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setHasError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        //TODO logger
        console.error(error);
        setHasError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, hasError, isLoading };
};
