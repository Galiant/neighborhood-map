import React, { Component } from "react";
import "./App.css";

class Sidebar extends Component {
  render() {
    return (
      <button id="button-sidebar" onClick={this.props.updateSidebar}>
        Search for coffee
      </button>
    );
  }
}

export default Sidebar;
