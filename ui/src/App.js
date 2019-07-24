import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import ChampionOverviewList from "./screens/overview_list/ChampionOverviewList";
import ChampionDetailedView from "./screens/detailed_view/ChampionDetailedView";
import PageNotFound from "./screens/common/PageNotFound";

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path={"/"} component={ChampionOverviewList}/>
                    <Route exact path={"/champions"} component={ChampionOverviewList}/>
                    <Route exact path={"/champions/:championId"} component={ChampionDetailedView}/>
                    <Route path="/404" component={PageNotFound}/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
