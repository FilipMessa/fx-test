import { Table, Badge } from "antd";

import { TableCountryFlag } from "./TableCountryFlag";
import { CurrencyExchangeRate } from "../types";

type Props = {
  exchangeRates: CurrencyExchangeRate[] | null;
  baseCurrency: string | null;
  isLoading: boolean;
};

export const ExchangeRateTable = ({
  exchangeRates,
  baseCurrency,
  isLoading = false,
}: Props) => {
  return (
    <Badge.Ribbon text={baseCurrency}>
      <Table
        dataSource={exchangeRates || []}
        pagination={false}
        loading={isLoading}
        showHeader
        rowKey={(record) => record.currency}
      >
        <Table.Column
          title="Country"
          dataIndex="country"
          render={TableCountryFlag}
        />
        <Table.Column title="Currency" dataIndex="currency" />
        <Table.Column
          title="Sell"
          dataIndex="sell"
          render={ExchangeRateValue}
        />
        <Table.Column title="Buy" dataIndex="buy" render={ExchangeRateValue} />
      </Table>
    </Badge.Ribbon>
  );
};

const ExchangeRateValue = (value?: string) => (value ? value : "-");
