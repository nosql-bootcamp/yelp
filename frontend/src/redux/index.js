import { combineReducers } from "redux";
import searchResult from "./search";
import location from "./location";

export * from "./search";
export * from "./location";

export default combineReducers({
  searchResult,
  location
});
