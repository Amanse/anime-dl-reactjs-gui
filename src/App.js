import React, { Component } from "react";
import { eel } from "./components/eel.js";
import "./App.css";
import "./assets/main.css";

import NavigationBar from "./components/NavBar/Nav";
import SearchElement from "./components/SearchPage/Search";
import AnimeInfo from "./components/AnimePage/AnimeInfo.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        eel.set_host("ws://localhost:8888");
    }
    render() {
        return (
            <div>
                <Router>
                    <NavigationBar />
                    <Switch>
                        <Route path="/search" exact component={SearchElement} />
                        <Route
                            path="/anime/:provider/:animeLink"
                            component={AnimeInfo}
                        />
                        {/* <Route path="/browse" exact component={}/> */}
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
