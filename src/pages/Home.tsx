import { Link } from "react-router-dom";
import { Row } from "antd";

import { CurrencyList } from "../components/CurrencyList";

const Home = () => (
  <main>
    <CurrencyList />
    <nav>
      <Link to="/about">About</Link>
    </nav>
  </main>
);

export default Home;
