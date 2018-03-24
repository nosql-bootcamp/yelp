import SearchResults from "./SearchResults";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    results: state.searchResult
  };
};

export default connect(mapStateToProps)(SearchResults);
