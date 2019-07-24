import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import WebFont from "webfontloader";

require("dotenv");

WebFont.load({
    google: {
        families: ["MedievalSharp", "Open Sans", "sans-serif"]
    }
});

ReactDOM.render(<App/>, document.getElementById("root"));
