/**
  * Require Modules
  */
const React = require('react');
const ReactDOM = require('react-dom');
const Watchlist = require('./Watchlist.js');

/* Render Watchlist */
ReactDOM.render(<Watchlist />, document.querySelector("content"));

/* Auto Populate Watchlist with pre-determined users */
_WatchlistComponent.getUserData("pgl_dota");
_WatchlistComponent.getUserData("Forsenlol");
_WatchlistComponent.getUserData("test_channel");
_WatchlistComponent.getUserData("Peeve");
_WatchlistComponent.getUserData("faraazKhan");
