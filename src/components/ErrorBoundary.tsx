import React, { ReactNode, ErrorInfo } from "react";
import { Result } from "antd";

import logger from "../services/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="Error"
          subTitle="Sorry, something went wrong."
        />
      );
    }

    return this.props.children;
  }
}
