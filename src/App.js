import React, { Component } from "react";
import "./App.css";
import Search from "./Search";
import axios from "axios";

class App extends Component {
  state = {
    venues: [],
    markers: [],
    selectedMarker: []
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
        console.log("ERROR!!! " + error);
      });
  };

  // Create a map
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 53.34, lng: -6.265 },
      zoom: 13
    });

    // Create an info window
    var infoWindow = new window.google.maps.InfoWindow();

    // Display dynamic markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}, ${
        myVenue.venue.location.address
      }`;

      // Create marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name,
        id: myVenue.venue.id
      });

      // Click on marker
      marker.addListener("click", function() {
        // Change the content
        infoWindow.setContent(contentString);

        // Open an info window
        infoWindow.open(map, marker);
      });
      this.state.markers.push(marker);
    });
  };

  render() {
    return (
      <main>
        <h1 className="title">Dublin Food</h1>
        <div id="map" />
        <Search
          venues={this.state.venues}
          markers={this.state.markers}
          contentString={this.contentString}
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
