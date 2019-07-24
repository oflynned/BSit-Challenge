const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.options("*", cors());

app.use(sslRedirect());

const championsRoute = require("./routes/championRoute");

app.use("/api/champions", championsRoute);

module.exports = app;
