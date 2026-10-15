import { Component, type ErrorInfo, type ReactNode } from "react";
import RemoteErrorFallback from "./RemoteErrorFallback";

type ErrorBoundaryProps = {
  name: string;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
  resetCount: number;
};

class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: "",
    resetCount: 0,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      message: error.message || "An unexpected rendering error occurred.",
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`${this.props.name} rendering failed:`, error, info);
  }

  handleRetry = () => {
    this.setState((state) => ({
      hasError: false,
      message: "",
      resetCount: state.resetCount + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <RemoteErrorFallback
          name={this.props.name}
          message={this.state.message}
          onRetry={this.handleRetry}
        />
      );
    }

    return <div key={this.state.resetCount}>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
