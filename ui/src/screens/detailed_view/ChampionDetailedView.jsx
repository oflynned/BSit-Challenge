import React, {Component, Fragment} from "react";
import {toast} from 'react-toastify';

import {championsEndpoint, getResource} from "../../common/restClient";
import LoadingScreen from "react-loading-screen";

import Emoji, {emojiMap} from "../../components/common/Emoji";
import {statsMap} from "../../common/stats";

import "./championDetailedView.css"

class ChampionDetailedView extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            champion: {}
        };

        toast.configure();
    }

    static fetchEmoji(stat) {
        return <Emoji symbol={emojiMap(stat)}/>
    }

    onBackClick() {
        this.props.history.push("/");
    }

    componentWillMount() {
        const championId = this.props.location.pathname.split("/")[2];
        getResource(championsEndpoint + "/" + championId)
            .then(champion => {
                setTimeout(() => {
                    this.setState({isLoading: false, champion})
                }, 150);
            })
            .catch(() => {
                toast("Something went wrong", {type: 'error'});
            })
    }

    render() {
        const {isLoading, champion} = this.state;
        return (
            <LoadingScreen
                loading={isLoading}
                bgColor="#FBF5F3"
                spinnerColor="#EA0232"
                textColor="#EA0232"
                logoSrc={require("../../assets/images/lol-logo.png")}>
                {
                    Object.getOwnPropertyNames(champion).length === 0 ?
                        <Fragment/> :
                        <div className={"detailed-view"}>
                            <h3 className={"action"} onClick={() => this.onBackClick()}>&lt; Back to champions</h3>
                            <img alt={"lol character icon"} src={champion.icon}/>
                            <div>
                                <h1 className={"heading"}>{champion.name} ({champion.title})</h1>
                                <p>
                                    {
                                        champion.tags.map((tag, index) => (tag + (index < champion.tags.length - 1 ? "/" : "")))
                                    }
                                </p>
                            </div>
                            <p>{champion.description}</p>
                            <table>
                                <thead>
                                <tr key={-1}>
                                    <th/>
                                    <th>Stat</th>
                                    <th>Value</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    Object.keys(champion.stats).map((key, index) => (
                                            <tr key={index}>
                                                <td>{ChampionDetailedView.fetchEmoji(key)}</td>
                                                <td>{statsMap(key)}</td>
                                                <td>{champion.stats[key]}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                }
            </LoadingScreen>
        )
    }
}

export default ChampionDetailedView;
