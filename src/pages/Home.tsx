import { Link } from "react-router-dom";
import { Result } from "antd";

import { useFetchForeignExchange } from "../hooks/useFetchForeignExchange";

import { ForeignExchangeList } from "../components/ForeignExchangeList";

const Home = () => {
  const { data, isLoading, hasError } = useFetchForeignExchange();

  return (
    <main>
      {hasError ? (
        <Result
          status="error"
          title="Sorry something went wrong. Please try again later."
        />
      ) : (
        <ForeignExchangeList
          isLoading={isLoading}
          fx={data?.fx}
          baseCurrency={data?.baseCurrency}
        />
      )}

      <nav>
        <Link to="/about">About</Link>
      </nav>
    </main>
  );
};

export default Home;
