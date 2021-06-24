import React from "react";
import { Component, useState } from "react";
import { eel } from "../eel.js";
import "./AnimeInfo.css";
import defaultBanner from "../../assets/empty-banner.jpg";

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
            console.log(e);
        });
    }

    render() {
        return (
            <div className="h-screen">
                <img
                    className=""
                    src={this.state.cover ? this.state.cover : defaultBanner}
                    alt="Cover"
                    width="100%"
                    style={{
                        WebkitFilter: "blur(5px)",
                        WebkitMask:
                            "-webkit-linear-gradient(black, black 0%, black)",
                    }}
                />
                <div className="relative grid items-center grid-cols-3  justify-items-center bottom-36">
                    <img
                        className="relative shadow-md right-10 srounded-lg h-80"
                        src={this.state.poster}
                    />
                    <div className="relative top-4 right-1/4">
                        <div className="relative text-5xl font-bold bottom-2">
                            {this.state.title}
                        </div>
                        <div className="text-xl ">{this.state.description}</div>
                    </div>
                    <div className="relative text-2xl font-light top-10 right-1/4">
                        <div>
                            <span className="font-semibold">Year:</span>{" "}
                            {this.state.year}
                        </div>
                        <div>
                            <span className="font-semibold">
                                Airing Status:
                            </span>{" "}
                            {this.state.status}
                        </div>
                        <div>
                            <span className="font-semibold">
                                Total Episodes:
                            </span>{" "}
                            {this.state.totalEps}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnimeInfo;
