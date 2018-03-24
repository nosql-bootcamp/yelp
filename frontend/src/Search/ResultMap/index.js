import { connect } from "react-redux";
import ResultMap from "./ResultMap";

const mapStateToProps = state => {
  return {
    results: state.searchResult
  };
};

export default connect(mapStateToProps)(ResultMap);
