import ReactCountryFlag from "react-country-flag";
import { Space } from "antd";

type Props = {
  countryCode: string;
  name: string;
};

const FLAG_SIZE = "2em";

export const TableCountryFlag = ({ countryCode, name }: Props) => (
  <Space>
    <ReactCountryFlag
      countryCode={countryCode}
      alt={name}
      svg
      style={{
        height: FLAG_SIZE,
        width: FLAG_SIZE,
      }}
    />
    <span>{name}</span>
  </Space>
);
