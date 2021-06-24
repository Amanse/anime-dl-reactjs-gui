import React from "react";
import { Component } from "react";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="search-result">
                <img src={this.props.poster} height="150" weight="200" />
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default SearchResult;
