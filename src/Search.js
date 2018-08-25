import React, { Component } from "react";
import Locations from "./Locations";
import "./App.css";

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search bars & restaurants"
          className="search-input"
        />
        {this.props.venues.map(myVenue => {
          return (
            <Locations
              key={myVenue.venue.id}
              venues={this.props.venues}
              myVenue={myVenue}
            />
          );
        })}
      </div>
    );
  }
}
export default Search;
