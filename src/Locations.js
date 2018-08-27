import React, { Component } from "react";
import "./App.css";

class Locations extends Component {
  // Open marker on button click
  showInfoWindow = () =>
    this.props.markers.map(marker => {
      if (marker.id === this.props.myVenue.venue.id) {
        this.props.updateInfoWindow(
          // Display informations for info window
          `<h4>Name:</h4> 
          ${this.props.myVenue.venue.name}
          <h4>Address:</h4>
          ${this.props.myVenue.venue.location.address} 
          <h4>Latitude, Longitude:</h4>
          ${this.props.myVenue.venue.location.lat.toFixed(2)}, 
          ${this.props.myVenue.venue.location.lng.toFixed(2)}`
        );
        this.props.openInfoWindow(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
      } else {
        marker.setAnimation(null);
      }
    });
  render() {
    const coffee = `${this.props.myVenue.venue.name}`;

    return (
      <div className="locations">
        <button onClick={this.showInfoWindow} role="button">
          {coffee}
        </button>
      </div>
    );
  }
}
export default Locations;
