import { Table, Space } from "antd";
import ReactCountryFlag from "react-country-flag";

// TODO baseCurrency from API
export const CurrencyList = ({ baseCurrency = "EUR" }: any) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: baseCurrency,
  });
  return (
    <Table
      dataSource={mockDate}
      pagination={false}
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

const mockDate = [
  {
    country: { countryCode: "EU", countryName: "European union" },
    currency: "EUR",
    sell: 3,
    buy: 3.5,
  },
];
