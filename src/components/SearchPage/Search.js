import React from "react";
import { Component, useState } from "react";
import { Link } from "react-router-dom";
import { eel } from "../eel.js";

import SearchResult from "./SearchResult.js";
import "./SearchResult.css";

class SearchElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            providers: [],
            currentProvider: "twist.moe",
        };

        eel.set_host("ws://localhost:8888");
        eel.get_providers()().then((e) => {
            this.setState({ currentProvider: e[0], providers: e[1] });
        });
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={(e) => this.setState({ query: e.target.value })}
                />
                <select
                    onChange={(e) =>
                        this.setState({
                            currentProvider: e.target.value,
                            results: [],
                        })
                    }
                    value={this.state.currentProvider}
                >
                    {this.state.providers.map((e) => (
                        <option>{e}</option>
                    ))}
                </select>
                <button
                    onClick={async () => {
                        const res = await eel.search_anime(
                            this.state.query,
                            this.state.currentProvider
                        )();
                        this.setState({
                            results: Array.from(res),
                        });
                    }}
                >
                    Search
                </button>

                <ul className="results">
                    {this.state.results.map((res) => {
                        return (
                            <Link
                                to={`/anime/${encodeURIComponent(
                                    this.state.currentProvider
                                )}/${encodeURIComponent(res.link)}`}
                            >
                                <li>
                                    <SearchResult
                                        title={res.title}
                                        link={res.link}
                                        poster={res.poster}
                                    />
                                </li>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default SearchElement;
