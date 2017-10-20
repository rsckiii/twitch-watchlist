/**
  * Require Modules
  */
const React = require('react');
const ReactDOM = require('react-dom');
const Watchlist = require('./Watchlist.js');

/* Render Watchlist */
ReactDOM.render(<Watchlist />, document.querySelector("content"));

/* Auto Populate Watchlist with pre-determined users */
_WatchlistComponent.getUserData("saltybet");
_WatchlistComponent.getUserData("test_channel");
_WatchlistComponent.getUserData("Peeve");
