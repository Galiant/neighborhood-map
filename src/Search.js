import React, { Component } from "react";
import Locations from "./Locations";
import "./App.css";

class Search extends Component {
  render() {
    return (
      <div>
        {this.props.matchVenue.map(myVenue => {
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
