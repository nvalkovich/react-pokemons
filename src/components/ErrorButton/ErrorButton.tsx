import { Component } from 'react';
import './ErrorButton.css';

type ErrorButtonState = {
  isError: boolean;
};

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isError: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      throw new Error('Button Error');
    }
    return (
      <>
        <button onClick={this.handleClick} className="btn btn-error">
          Error
        </button>
      </>
    );
  }
}

export default ErrorButton;
