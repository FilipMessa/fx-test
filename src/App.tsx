import { Button } from "antd";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

import "./App.css";

const App = () => (
  <div className="App">
    <Button type="primary">Button ANT Design</Button>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  </div>
);

export default App;
