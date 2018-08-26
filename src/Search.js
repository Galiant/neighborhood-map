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

        {this.props.venues.map(myVenue => {
          const isMatch =
            !this.state.query ||
            this.state.matchVenue.find(mv => {
              return mv.venue.id === myVenue.venue.id;
            });
          if (!isMatch) return null;

          return (
            <Locations
              key={myVenue.venue.id}
              venues={this.state.venues}
              markers={this.props.markers}
              contentString={this.props.contentString}
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
