import { ReactNode, memo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Typography, Image, Row, Col } from "antd";

import { NAV_LINKS } from "../consts";
import logo from "../assets/logo.png";

const { Header, Content } = Layout;

type Props = {
  children: ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  const { pathname } = useLocation();
  const isAboutPage = pathname.split("/")[1] === NAV_LINKS.about;

  return (
    <Layout>
      <Header data-cy="page-header">
        <Row align="middle" style={{ height: "100%" }}>
          <Col xs={0} sm={1}>
            <GeorgeLogo />
          </Col>
          <Col flex={10}>
            <Typography.Title style={{ margin: "0 8px", color: "#fff" }}>
              George FE test
            </Typography.Title>
          </Col>
          <Col>
            <NavLink to={isAboutPage ? NAV_LINKS.home : NAV_LINKS.about}>
              <Typography.Link>
                {isAboutPage ? "Home" : "About"}
              </Typography.Link>
            </NavLink>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "10px 50px" }}>{children}</Content>
    </Layout>
  );
};

const GeorgeLogo = memo(() => (
  <NavLink to={NAV_LINKS.home} title="go to the home page">
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
  </NavLink>
));
