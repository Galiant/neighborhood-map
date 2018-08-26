import React, { Component } from "react";
import "./App.css";

class Locations extends Component {
  // Open marker on button click
  showInfoWindow = () =>
    this.props.markers.map(marker => {
      if (marker.id === this.props.myVenue.venue.id) {
        // Open info window
        var infoWindow = new window.google.maps.InfoWindow({
          content: this.props.contentString
        });
      }
    });
  render() {
    const food = `${this.props.myVenue.venue.name}`;

    return (
      <div className="locations">
        <button onClick={this.showInfoWindow}>{food}</button>
      </div>
    );
  }
}
export default Locations;
