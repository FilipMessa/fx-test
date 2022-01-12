import { ReactNode } from "react";
import { Layout, Typography, Image, Row, Col, Space } from "antd";

import logo from "../assets/logo.png";
import { SearchBar } from "./SearchBar";

const { Header, Content } = Layout;

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Header>
        <Row align="middle" style={{ height: "100%" }}>
          <Col xs={0} sm={1}>
            <Image
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                maxHeight: "43px",
              }}
              preview={false}
              src={logo}
              alt="logo"
            />
          </Col>
          <Col flex={11}>
            <Typography.Title style={{ margin: "0 8px", color: "#fff" }}>
              George FE test
            </Typography.Title>
          </Col>
        </Row>
      </Header>

      {/* TODO(dev): remove height  */}
      <Content style={{ padding: "10px 50px", height: 12000 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <SearchBar
            onSearch={() => {
              // TODO
            }}
          />
          {children}
        </Space>
      </Content>
    </Layout>
  );
};
