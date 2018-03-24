import React, { Component } from "react";
import { Input, Slider } from "antd";
import { func } from "prop-types";
import SearchResults from "./SearchResults";
import ResultMap from "./ResultMap";

import "./Search.css";

const SearchInput = Input.Search;

const sliderLabelFormatter = value => `${value * 100} Km`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { distance: 100 };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleHiglight = this.handleHiglight.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
  }

  state = {
    highlighted: null
  };

  render() {
    return [
      <div className="search-field" key="search">
        <h1>Business search</h1>,
        <SearchInput
          placeholder="Input business name"
          onSearch={this.handleSearch}
          enterButton
        />
        <div className="slider-container">
          <h3>Max distance</h3>
          <Slider
            marks={{ 0: "0 Km", 100: "10000 Km" }}
            tipFormatter={sliderLabelFormatter}
            onChange={v => this.setState({ distance: v })}
            value={this.state.distance}
          />
        </div>
      </div>,
      this.props.hasResults && (
        <div className="result" key="result">
          <div className="result-container">
            <SearchResults
              onHighlight={this.handleHiglight}
              highlighted={this.state.highlighted}
              resetHighlight={this.resetHighlight}
            />
          </div>
          <div className="map-container">
            <ResultMap
              onHighlight={this.handleHiglight}
              highlighted={this.state.highlighted}
            />
          </div>
        </div>
      )
    ];
  }

  resetHighlight() {
    this.setState({ highlighted: null });
  }

  handleHiglight(id) {
    this.setState({ highlighted: id });
  }

  handleSearch(text) {
    this.props.search(text, this.state.distance * 100);
  }
}

Search.propTypes = {
  search: func.isRequired
};

export default Search;
