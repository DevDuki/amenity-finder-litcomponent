import { html, LitElement } from 'lit';
import { canGeolocate, detectUserLocation } from '../utils/geolocation.js';

import '@material/mwc-button';
import '@material/mwc-textfield';
import '@inventage/leaflet-map';

export class SearchView extends LitElement {
  static get properties() {
    return {
      latitude: { type: String },
      longitude: { type: String },
      radius: { type: Number },
    };
  }

  _triggerSearch() {
    this.dispatchEvent(
      new CustomEvent('execute-search', {
        detail: {
          latitude: this.latitude,
          longitude: this.longitude,
          radius: this.radius,
        },
      })
    );
  }

  _canSearch() {
    return this.latitude && this.longitude && this.radius;
  }

  async _handleLocateMeClick(event) {
    event.target.blur();

    try {
      const {
        coords: { latitude, longitude },
      } = await detectUserLocation();

      this.latitude = latitude;
      this.longitude = longitude;
    } catch (error) {
      console.error(error);
    }
  }

  _updateLatitudeLongitudeFromMap(event) {
    const {
      detail: { latitude, longitude },
    } = event;

    if (!latitude || !longitude) {
      return;
    }

    this.latitude = latitude;
    this.longitude = longitude;
  }

  render() {
    return html`
      <h1>Search</h1>

      <mwc-textfield
        label="Latitude"
        .value="${this.latitude}"
        @keyup="${event => (this.latitude = event.target.value)}"
      ></mwc-textfield>
      <mwc-textfield
        label="Longitude"
        .value="${this.longitude}"
        @keyup="${event => (this.longitude = event.target.value)}"
      ></mwc-textfield>
      <mwc-textfield
        label="Radius (m)"
        .value="${this.radius}"
        @keyup="${event => (this.radius = event.target.value)}"
      ></mwc-textfield>

      <mwc-button
        outlined
        label="Locate Me"
        icon="my_location"
        @click="${this._handleLocateMeClick}"
        .disabled="${!canGeolocate()}"
      ></mwc-button>
      <mwc-button
        raised
        label="Search"
        @click="${this._triggerSearch}"
        .disabled="${!this._canSearch()}"
      ></mwc-button>

      <leaflet-map
        .latitude="${this.latitude}"
        .longitude="${this.longitude}"
        .radius="${this.radius}"
        @center-updated="${this._updateLatitudeLongitudeFromMap}"
        updateCenterOnClick
      ></leaflet-map>
    `;
  }
}

customElements.define('search-view', SearchView);
