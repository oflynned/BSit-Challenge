import React, {Component} from "react";
import {Redirect} from 'react-router-dom'

import PrimaryActionButton from "../../components/buttons/PrimaryActionButton";
import Emoji from "../../components/common/Emoji";

import "./pageNotFound.css";

class PageNotFound extends Component {
    constructor() {
        super();
        this.state = {
            isRedirecting: false
        }
    }

    onClick = () => {
        this.setState({isRedirecting: true})
    };

    render() {
        return (
            this.state.isRedirecting ?
                <Redirect to={"/champions"}/> :
                <div className={"page-not-found"}>
                    <div>
                        <span>Hmm... This page doesn't seem to exist <Emoji symbol="🤔"/></span>
                        <PrimaryActionButton label={"Back to Home"} onClick={this.onClick}/>
                    </div>
                </div>
        );
    }
}

export default PageNotFound;
