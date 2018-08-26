import React, { Component } from "react";
import "./App.css";
import Search from "./Search";
import Error from "./Error";
import axios from "axios";

class App extends Component {
  state = {
    venues: [],
    markers: [],
    error: false
  };

  componentDidMount() {
    this.getData();
    if (window.google === undefined) {
      this.setState({ error: true });
    }
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
      query: "food",
      near: "Dublin, IE",
      v: "20182208"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items
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

  updateInfoWindow = contentString => {
    if (this.infoWindow) this.infoWindow.setContent(contentString);
  };

  openInfoWindow = marker => {
    if (this.infoWindow) this.infoWindow.open(this.map, marker);
  };

  // Create a map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 53.34, lng: -6.26 },
      zoom: 13
    });

    this.map = map;

    // Create an info window
    const infoWindow = new window.google.maps.InfoWindow();
    this.infoWindow = infoWindow;

    // Display dynamic markers
    this.state.venues.map(myVenue => {
      const contentString = `${myVenue.venue.name}, ${
        myVenue.venue.location.address
      }s`;

      // Create marker
      const marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
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
      this.state.markers.push(marker);
    });
  };

  render() {
    return (
      <main role="application">
        <h1 className="title">Dublin Food</h1>
        <div id="map" />
        <Search
          venues={this.state.venues}
          markers={this.state.markers}
          contentString={this.contentString}
          updateInfoWindow={this.updateInfoWindow}
          openInfoWindow={this.openInfoWindow}
        />
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
