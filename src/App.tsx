import { Button } from "antd";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import "./App.css";

import { ErrorBoundary } from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const App = () => (
  <ErrorBoundary>
    <Button type="primary">Button ANT Design</Button>
    <Suspense fallback={<Spin tip="Loading..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default App;
