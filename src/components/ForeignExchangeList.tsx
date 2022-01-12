import { Table, Space } from "antd";
import { useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import { Fx } from "../hooks/useFetchForeignExchange";

type Props = {
  baseCurrency?: string;
  fx?: Fx[];
  isLoading: boolean;
};

export const ForeignExchangeList = ({
  baseCurrency = "USD",
  fx,
  isLoading = false,
}: Props) => {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: baseCurrency,
      }),
    [baseCurrency]
  );

  return (
    <Table
      loading={isLoading}
      dataSource={mockData}
      pagination={false}
      showHeader
      rowKey={(record) => record.country.countryCode}
    >
      <Table.Column
        title="Country"
        dataIndex="country"
        // TODO: TS
        render={(item) => (
          <Space>
            <ReactCountryFlag
              countryCode={item.countryCode}
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
            />
            <span>{item.countryName}</span>
          </Space>
        )}
      />
      <Table.Column title="Currency" dataIndex="currency" />
      <Table.Column title="Sell" dataIndex="sell" render={formatter.format} />
      <Table.Column title="Buy" dataIndex="buy" render={formatter.format} />
    </Table>
  );
};

const mockData = [
  {
    country: { countryCode: "EU", countryName: "European union" },
    currency: "EUR",
    sell: 3,
    buy: 3.5,
  },
];
