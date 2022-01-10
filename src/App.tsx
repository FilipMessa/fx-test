import { Button } from "antd";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const App = () => (
  <div className="App">
    <Button type="primary">Button ANT Design</Button>
    <Suspense fallback={<Spin tip="Loading..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
