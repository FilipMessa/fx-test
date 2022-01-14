import { useContext } from "react";
import { Result, Space } from "antd";

import { ExchangeRateContext } from "../components/ExchangeRateContext";
import { ExchangeRateTable } from "../components/ExchangeRateTable";
import { SearchBar } from "../components/SearchBar";

const Home = () => {
  const {
    exchangeRates,
    isLoading,
    hasError,
    onSearch,
    searchTerm,
    baseCurrency,
  } = useContext(ExchangeRateContext);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SearchBar
        onSearch={onSearch}
        searchTerm={searchTerm}
        isDisabled={isLoading}
      />
      <main>
        {hasError ? (
          <Result
            status="error"
            title="Sorry something went wrong. Please try again later."
          />
        ) : (
          <ExchangeRateTable
            baseCurrency={baseCurrency}
            exchangeRates={exchangeRates}
            isLoading={isLoading}
          />
        )}
      </main>
    </Space>
  );
};

export default Home;
