import React from "react";
import { Component, useState } from "react";
import { eel } from "../eel.js";
import "./AnimeInfo.css";

class AnimeInfo extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            title: "",
            poster: "",
            cover: "",
            description: "",
            year: "N/A",
            status: "N/A",
            totalEps: 0,
            isLoading: true,
        };

        eel.set_host("ws://localhost:8888");

        eel.get_metadata(
            decodeURIComponent(this.props.match.params.animeLink),
            decodeURIComponent(this.props.match.params.provider)
        )().then((e) => {
            this.setState({
                title: e.title,
                poster: e.poster,
                cover: e.cover,
                description: e.desc,
                year: e.year,
                status: e.status,
                totalEps: e.total_eps,
                isLoading: false,
            });
        });
    }

    render() {
        return (
            <div>
                <div
                    className="anime-banner"
                    tabIndex="99"
                    style={{
                        backgroundImage: this.state.cover, //`url(&quot;&quot;)`,
                    }}
                ></div>
                {/* <img src={this.state.cover} className="anime-banner"></img> */}
                <img src={this.state.poster} className="anime-poster"></img>
            </div>
        );
    }
}

export default AnimeInfo;
