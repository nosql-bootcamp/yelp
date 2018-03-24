import React, { Component } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import { isEqual } from "lodash";

import markerIcon from "./marker2.png";
import "./ResultMap.css";

const LeafletIcon = L.Icon.extend({
  options: {
    iconSize: [27, 40],
    iconAnchor: [13.5, 40],
    popupAnchor: [0, -40]
  }
});

class ResultMap extends Component {
  constructor(props) {
    super(props);

    this.populateMap = this.populateMap.bind(this);
    this.clearMap = this.clearMap.bind(this);
  }

  componentDidMount() {
    this.map = L.map("result-map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.populateMap(this.props.results);
  }

  componentWillReceiveProps(newProps) {
    const newIds = this.extractIds(newProps.results);

    if (!isEqual(this.ids, newIds)) {
      // Marker have changed
      this.clearMap();
      this.populateMap(newProps.results);
    }

    if (
      newProps.highlighted &&
      newProps.highlighted !== this.props.highlighted
    ) {
      this.map.closePopup();

      // Highlighted marker have changed
      const marker = this.markers.get(newProps.highlighted);

      if (marker) {
        marker.openPopup();
      }
    }
  }

  extractIds(results) {
    return results.map(r => r.id).reduce((acc, val) => {
      acc.add(val);
      return acc;
    }, new Set());
  }

  populateMap(results) {
    const coords = [];

    this.ids = this.extractIds(results);

    this.markers = new Map();
    results.forEach(res => {
      const { lat, lon } = res.location;
      const coord = [lat, lon];
      coords.push(coord);
      const marker = L.marker(coord, {
        icon: new LeafletIcon({ iconUrl: markerIcon })
      })
        .addTo(this.map)
        .bindPopup(`<a href="/business/${res.id}">${res.name}</a>`);

      this.markers.set(res.id, marker);
    });

    this.map.fitBounds(new L.LatLngBounds(coords));
  }

  clearMap() {
    if (this.markers) {
      [...this.markers.values()].forEach(m => this.map.removeLayer(m));
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="result-map" />;
  }
}

export default ResultMap;
