import Search from "./Search.jsx";
import { connect } from "react-redux";
import { search } from "../redux";

const mapStateToProps = state => {
  return {
    hasResults: state.searchResult.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: (text, distance) => dispatch(search(text, distance))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
