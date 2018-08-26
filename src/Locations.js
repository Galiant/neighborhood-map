import React, { Component } from "react";
import "./App.css";

class Locations extends Component {
  // Open marker on button click
  showInfoWindow = () =>
    this.props.markers.map(marker => {
      if (marker.id === this.props.myVenue.venue.id) {
        this.props.updateInfoWindow(`
        ${this.props.myVenue.venue.name},
        ${this.props.myVenue.venue.location.address}
        `);
        this.props.openInfoWindow(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 3000);
      } else {
        marker.setAnimation(null);
      }
    });
  render() {
    const coffee = `${this.props.myVenue.venue.name}`;

    return (
      <div className="locations">
        <button onClick={this.showInfoWindow}>{coffee}</button>
      </div>
    );
  }
}
export default Locations;
