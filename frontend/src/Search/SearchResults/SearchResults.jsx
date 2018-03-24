import React from "react";
import { array } from "prop-types";
import { List, Icon } from "antd";
import { Link } from "react-router-dom";

import "./SearchResults.css";

const SearchResults = ({
  results,
  onHighlight,
  resetHighlight,
  highlighted
}) => (
  <List
    size="large"
    className="SearchResults"
    dataSource={results}
    renderItem={({ id, name, stars, review_count, city }) => (
      <Link
        to={`business/${id}`}
        onMouseEnter={() => onHighlight(id)}
        onMouseLeave={resetHighlight}
      >
        <List.Item
          className={highlighted === id ? "highlighted" : ""}
          actions={[
            <span>
              {stars}
              <Icon type="star-o" style={{ marginLeft: 8 }} />
            </span>,
            <span>
              {review_count}
              <Icon type="message" style={{ marginLeft: 8 }} />
            </span>
          ]}
        >
          <div className="result-cell">
            {name}
            <div className="city">{city}</div>
          </div>
        </List.Item>
      </Link>
    )}
  />
);

SearchResults.propTypes = {
  results: array.isRequired
};

export default SearchResults;
