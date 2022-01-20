import { Typography, Divider } from "antd";

const { Title, Paragraph, Link } = Typography;

const About = () => (
  <>
    <Typography>
      <Title>About</Title>
      <Paragraph>
        This project was created as an assignment before the second round of the
        interview process for the position of Gorge FE developer. The task was
        to create a small application that displays the currency exchange rates.
      </Paragraph>
      <Title level={2}>Tech stack</Title>
      <Paragraph>
        <ul>
          <li>
            <Link target="_blank" href="https://create-react-app.dev/">
              Create React App (typescript)
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://ant.design/">
              Ant design
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://axios-http.com/docs/intro">
              Axios
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://reactrouter.com/">
              React Router
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://www.cypress.io/">
              Cypress
            </Link>
          </li>
        </ul>
      </Paragraph>
    </Typography>
    <Divider />
    <Paragraph>
      More information and the whole project can be found at{" "}
      <Link href="https://github.com/FilipMessa/fx-test" target="_blank">
        www.github.com/FilipMessa/fx-test
      </Link>{" "}
      🖖
    </Paragraph>
  </>
);

export default About;
