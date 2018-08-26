import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import Locations from "./Locations";
import "./App.css";

class Search extends Component {
  state = {
    query: "",
    matchVenue: []
  };

  displayQuery = query => {
    this.setState({ query }, this.theSearch);
  };

  theSearch = query => {
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");

      this.setState({
        matchVenue: this.props.venues.filter(myVenue =>
          match.test(myVenue.venue.name)
        )
      });
    } else {
      this.setState({ matchVenue: this.props.venues });
    }
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
        {this.state.matchVenue.map(myVenue => {
          return (
            <Locations
              key={myVenue.venue.id}
              venues={this.state.matchVenue}
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
