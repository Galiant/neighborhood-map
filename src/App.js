import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import "./App.css";
import Search from "./Search";
import Error from "./Error";
import axios from "axios";

class App extends Component {
  state = {
    venues: [],
    matchVenue: [],
    markers: [],
    query: "",
    error: false
  };

  componentDidMount() {
    this.getData();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtG0Ps2kXa-IWaGlwCSYAvGJW57czVJhY&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  // fetch data from Foursquare API
  getData = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "SEUCL1M05UTPL3Z3U0HC2SKNULTU2JI4JY0HAM0ZXLAVNIUW",
      client_secret: "WBBHHBLA1AF5O5JF45X5QJKPGWYILXGI5T1FT3RDB4TIP4N1",
      query: "coffee",
      limit: 25,
      near: "Dublin, IE",
      v: "20182208"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items,
            matchVenue: response.data.response.groups[0].items
          },
          this.renderMap()
        );
      })
      .catch(error => {
        console.log("ERROR", error);
        this.setState({ error: true });
      });
  };

  map = null;
  infoWindow = null;

  //Info window function
  updateInfoWindow = contentString => {
    if (this.infoWindow) this.infoWindow.setContent(contentString);
  };

  openInfoWindow = marker => {
    if (this.infoWindow) this.infoWindow.open(this.map, marker);
  };

  // Search function
  displayQuery = query => {
    this.setState({ query }, this.theSearch);
  };

  theSearch = query => {
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");

      this.setState(
        {
          matchVenue: this.state.venues.filter(myVenue =>
            match.test(myVenue.venue.name)
          )
        },
        this.updateVisibility
      );
    } else {
      this.setState({ matchVenue: this.state.venues }, this.updateVisibility);
    }
  };

  // Create a map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 53.33, lng: -6.27 },
      zoom: 13.5
    });

    this.map = map;

    // Create an info window
    const infoWindow = new window.google.maps.InfoWindow();
    this.infoWindow = infoWindow;

    // Display dynamic markers
    this.createMarker();
  };

  updateVisibility = () => {
    this.state.markers.forEach(marker => {
      const isVisible = this.state.matchVenue.find(
        myVenue => myVenue.venue.id === marker.id
      );
      marker.setMap(isVisible ? this.map : null);
    });
  };

  createMarker = () => {
    const newMarker = [];

    this.state.venues.map(myVenue => {
      const { lat, lng } = myVenue.venue.location;
      this.lat = lat;
      this.lng = lng;
      const contentString = `${myVenue.venue.name}, ${
        myVenue.venue.location.address
      }`;

      // Create marker
      const marker = new window.google.maps.Marker({
        position: {
          lat: lat,
          lng: lng
        },
        map: this.map,
        title: myVenue.venue.name,
        id: myVenue.venue.id,
        animation: window.google.maps.Animation.DROP
      });

      // Click on marker
      marker.addListener("click", () => {
        // Change the content
        this.updateInfoWindow(contentString);

        // Open an info window
        this.openInfoWindow(marker);
      });
      // Bounce effect on mouse over
      marker.addListener("mouseover", () => {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });
      // Remove bounce effect on mouse out
      marker.addListener("mouseout", function() {
        marker.setAnimation() !== null;
      });
      newMarker.push(marker);
    });
    this.setState({ markers: newMarker });
  };

  render() {
    if (this.state.error) {
      return <Error />;
    } else {
      return (
        <main role="application">
          <h1 className="title">Coffee in Dublin</h1>
          <div id="map" />
          <div className="search">
            <input
              type="text"
              placeholder="Search bars & restaurants"
              value={this.state.query}
              onChange={e => this.displayQuery(e.target.value)}
              className="search-input"
            />
            <Search
              venues={this.state.venues}
              matchVenue={this.state.matchVenue}
              markers={this.state.markers}
              lat={this.lat}
              lng={this.lng}
              updateInfoWindow={this.updateInfoWindow}
              openInfoWindow={this.openInfoWindow}
            />
          </div>
        </main>
      );
    }
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.onerror = () => {
    document.getElementById("map").innerHTML =
      "The map could not be loaded!!! Try again or come back later.";
  };
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
