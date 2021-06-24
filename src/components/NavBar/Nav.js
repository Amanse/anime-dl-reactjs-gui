import React from "react";
import { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        const navStyle = {
            color: "white",
        };
        return (
            <nav>
                <h3>Anime DL Web GUI</h3>
                <ul className="nav-links">
                    <Link style={navStyle} to="/">
                        <li>Home</li>
                    </Link>
                    <Link style={navStyle} to="/search">
                        <li>Search</li>
                    </Link>
                    <Link style={navStyle} to="/browse">
                        <li>Browse</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;
