import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class ShopLocationsMap extends Component {
  render() {
    const mapContainerStyle = {
      width: "500px", // Set your desired width
      height: "300px" // Set your desired height
    };

    return (
      <div style={mapContainerStyle}>
        <Map
          google={this.props.google}
          initialCenter={{ lat: 23.70093307871032, lng: 90.39389398299997 }}
          zoom={13} // Adjust the zoom level as needed
        >
          <Marker
            position={{ lat: 23.70093307871032, lng: 90.39389398299997 }}
            title="My Shop"
          />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAK-lm5gdnsKARlSb10nkRfKoGCycwH49Y" // Replace with your API key
})(ShopLocationsMap);
