import React, { Component } from "react";
import "./App.css";

class Sidebar extends Component {
  render() {
    return (
      <button
        id="button-sidebar"
        aria-label="Search for coffee"
        onClick={this.props.updateSidebar}
      >
        Search for coffee
      </button>
    );
  }
}

export default Sidebar;
