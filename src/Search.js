import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import Locations from "./Locations";
import "./App.css";

class Search extends Component {
  render() {
    return (
      <div>
        {this.props.venues.map(myVenue => {
          return (
            <Locations
              key={myVenue.venue.id}
              markers={this.props.markers}
              myVenue={myVenue}
              updateInfoWindow={this.props.updateInfoWindow}
              openInfoWindow={this.props.openInfoWindow}
            />
          );
        })}
      </div>
    );
  }
}
export default Search;
