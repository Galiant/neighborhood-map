import React, { Component } from "react";
import Locations from "./Locations";
import "./App.css";

class Search extends Component {
  state = {
    query: "",
    matchVenue: []
  };

  displayQuery = query => {
    this.setState({ query }, this.showSearch);
  };

  render() {
    console.log(this.state.query);
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Search bars & restaurants"
          value={this.state.query}
          onChange={e => this.displayQuery(e.target.value)}
          className="search-input"
        />
        {this.props.venues.map(myVenue => {
          return (
            <Locations
              key={myVenue.venue.id}
              venues={this.props.venues}
              markers={this.props.markers}
              myVenue={myVenue}
              contentString={this.props.contentString}
            />
          );
        })}
      </div>
    );
  }
}
export default Search;
