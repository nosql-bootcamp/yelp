const SEARCH_START = "SEARCH_START";
const SEARCH_SUCCEED = "SEARCH_SUCCEED";
const SEARCH_FAILED = "SEARCH_FAILED";

const initialState = [];

export function search(text, distance) {
  return function(dispatch, getState) {
    dispatch(startSearch());

    const { lat, lon } = getState().location;

    fetch(`/business?q=${text}&lat=${lat}&lon=${lon}&distance=${distance}`)
      .then(res => res.json())
      .then(res => dispatch(searchSucceed(res)))
      .catch(err => dispatch(searchFailure(err)));
  };
}

function startSearch() {
  return { type: SEARCH_START };
}

function searchSucceed(results) {
  return { type: SEARCH_SUCCEED, results };
}

function searchFailure(error) {
  return { type: SEARCH_FAILED, error };
}

function searchResult(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUCCEED:
      return action.results;
    default:
      return state;
  }
}

export default searchResult;
