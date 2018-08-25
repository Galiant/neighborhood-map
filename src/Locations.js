import React, { Component } from "react";
import "./App.css";

class Locations extends Component {
  render() {
    const food = `${this.props.myVenue.venue.name}`;

    return (
      <div className="locations">
        <button>{food}</button>
      </div>
    );
  }
}
export default Locations;
