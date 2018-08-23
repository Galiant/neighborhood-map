import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtG0Ps2kXa-IWaGlwCSYAvGJW57czVJhY&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  getVenues = () => {
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
      center: { lat: 53.333, lng: -6.249 },
      zoom: 12
    });

    // Create an info window
    var infowindow = new window.google.maps.InfoWindow();

    // Display dynamic markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`;

      // Create marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });

      // Click on marker
      marker.addListener("click", function() {
        // Change the content
        infowindow.setContent(contentString);

        // Open an info window
        infowindow.open(map, marker);
      });
    });
  };

  render() {
    return (
      <main>
        <div id="map" />
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
