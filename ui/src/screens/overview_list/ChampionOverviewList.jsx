import React, {Component} from "react";
import LoadingScreen from "react-loading-screen";
import {toast} from "react-toastify";

import Card from "../../components/layout/Card";

import {championsEndpoint, getResource, limit} from "../../common/restClient";

import "./championOverviewList.css"

class ChampionOverviewList extends Component {
    constructor() {
        super();
        this.state = {
            isFirstLoading: true,
            isFetchingPagination: false,
            hasMore: true,
            champions: [],
            offset: 0
        };

        toast.configure();
    }

    componentWillMount() {
        this.loadChampions();
        window.addEventListener("scroll", e => {
            this.handleScroll(e);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    handleScroll = () => {
        const lastChild = document.querySelector("div.overview > div.card:last-child");
        if (lastChild) {
            const lastChildOffset = lastChild.offsetTop + lastChild.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;
            const {hasMore, isFetchingPagination} = this.state;
            if (pageOffset > lastChildOffset && hasMore && !isFetchingPagination) {
                this.setState({isFetchingPagination: true}, this.loadChampions);
            }
        }
    };

    loadChampions = () => {
        const {offset} = this.state;
        getResource(championsEndpoint, {limit, offset})
            .then(nextChampions => {
                this.setState({
                    isFirstLoading: false,
                    isFetchingPagination: false,
                    hasMore: nextChampions.length === limit,
                    offset: offset + limit,
                    champions: [
                        ...this.state.champions,
                        ...nextChampions
                    ]
                })
            })
            .catch(() => {
                toast("Something went wrong", {type: 'error'});
            })
    };

    onClick = ({id}) => {
        this.props.history.push(`/champions/${id}`);
    };

    render() {
        const {isFirstLoading, isFetchingPagination} = this.state;
        return (
            <LoadingScreen
                loading={isFirstLoading}
                bgColor="#FBF5F3"
                spinnerColor="#EA0232"
                textColor="#EA0232"
                logoSrc={require("../../assets/images/lol-logo.png")}>
                <div className={"overview"}>
                    <h1 className={"heading"}>League of Legends Champion List</h1>
                    {
                        this.state.champions.map(champion =>
                            <Card key={champion._id}
                                  onClick={this.onClick}
                                  champion={champion}/>
                        )
                    }
                    {isFetchingPagination && <div>Loading...</div>}
                </div>
            </LoadingScreen>
        );
    }
}

export default ChampionOverviewList;
