import React, { Component } from "react";

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error);
  }
  render() {
    return (
      <div
        style={{ height: "100vh" }}
        className="p-4 flex justify-content-center align-items-center text-xl sm:text-3xl md:text-4xl"
      >
        Uppss something when wrong...
      </div>
    );
  }
}
