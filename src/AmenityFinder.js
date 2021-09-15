import { LitElement, html, css } from 'lit';
import page from 'page';

import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-icon-button';

import './views/HomeView.js';
import './views/SearchView.js';
import './views/ResultsView.js';

export class AmenityFinder extends LitElement {
  constructor() {
    super();
    this.showSidebar = false;
    this.currentView = 'home';
    this.views = {
      home: html`<home-view></home-view>`,
      search: html`<search-view></search-view>`,
      results: html`<results-view></results-view>`,
    };

    this._initializeRoutes();
  }

  static get properties() {
    return {
      showSidebar: { type: Boolean },
      currentView: { type: String },
      views: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
      }

      main {
        padding: var(--amenity-container-padding, 1rem);
      }
    `;
  }

  _navigateTo(view) {
    this.currentView = view;
    this.showSidebar = false;
  }

  _renderCurrentView() {
    return this.views[this.currentView];
  }

  _initializeRoutes() {
    page('/', () => {
      this.currentView = 'home';
    });
    page('/results', () => {
      this.currentView = 'results';
    });
    page('/search', () => {
      this.currentView = 'search';
    });
    page();
  }

  // eslint-disable-next-line class-methods-use-this
  _navigateToUrl(url) {
    page(url);
    this._closeSidebar();
  }

  _closeSidebar() {
    this.showSidebar = false;
  }

  render() {
    return html`
      <mwc-drawer
        hasHeader
        type="modal"
        .open="${this.showSidebar}"
        @MDCDrawer:closed="${() => {
          this._closeSidebar();
        }}"
      >
        <span slot="title">Navigation</span>
        <mwc-list>
          <mwc-list-item @click="${() => this._navigateToUrl('/')}"
            >Home</mwc-list-item
          >
          <mwc-list-item @click="${() => this._navigateToUrl('/search')}"
            >Search</mwc-list-item
          >
          <mwc-list-item @click="${() => this._navigateToUrl('/results')}"
            >Results</mwc-list-item
          >
        </mwc-list>
        <div slot="appContent">
          <mwc-top-app-bar>
            <mwc-icon-button
              icon="menu"
              slot="navigationIcon"
              @click="${() => {
                this.showSidebar = !this.showSidebar;
              }}"
            ></mwc-icon-button>
            <div slot="title">Title</div>
          </mwc-top-app-bar>
          <main>${this._renderCurrentView()}</main>
        </div>
      </mwc-drawer>
    `;
  }
}

customElements.define('amenity-finder', AmenityFinder);
