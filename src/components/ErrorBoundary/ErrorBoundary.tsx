import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fallback-ui">
          <h1 className="title">Oops! Something went wrong.. </h1>
          <img
            src="./images/sad-pokemon.png"
            className="fallback-ui__image"
          ></img>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
