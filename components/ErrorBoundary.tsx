import { Component, ErrorInfo, ReactNode } from 'react';
import styles from '../styles/ErrorBoundary.module.css';
import Image from 'next/image';
import '../public/images/sad-pokemon.png';

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
        <div className={styles.fallback_ui}>
          <h1 className="title">Oops! Something went wrong.. </h1>
          <Image
            src="/images/sad-pokemon.png"
            alt="error-image"
            width={200}
            height={200}
          ></Image>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
