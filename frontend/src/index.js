import thunkMiddleware from "redux-thunk";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers, { updateLocation } from "./redux";

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// TODO should probably be elsewhere
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      store.dispatch(updateLocation(pos));
    },
    function() {
      console.log("Could not get location");
    }
  );
}
