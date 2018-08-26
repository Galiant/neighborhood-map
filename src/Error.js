import React, { Component } from "react";
import "./App.css";

class Error extends Component {
  render() {
    return (
      <div className="error">
        <p> Ups......Something went wrong!!! </p>
        <p> Application could not be loaded. </p>
      </div>
    );
  }
}

export default Error;
