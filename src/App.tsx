import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";
import "./App.css";

import { PageLayout } from "./components/PageLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const Navigation = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
  </Routes>
);

const App = () => (
  <ErrorBoundary>
    <PageLayout>
      <Suspense fallback={<Spin tip="Loading..." />}>
        <Navigation />
      </Suspense>
    </PageLayout>
  </ErrorBoundary>
);

export default App;
