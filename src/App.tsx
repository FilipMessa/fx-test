import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Spin } from "antd";

import { ExchangeRateContextProvider } from "./components/ExchangeRateContext";
import { PageLayout } from "./components/PageLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { NAV_LINKS } from "./consts";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));

const Navigation = () => (
  <Routes>
    <Route
      path={NAV_LINKS.home}
      element={
        <ExchangeRateContextProvider>
          <Home />
        </ExchangeRateContextProvider>
      }
    />
    <Route path={NAV_LINKS.about} element={<About />} />
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
