const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const logger = require("./config/winston");
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";
const morgan = require("morgan");

module.exports = () => {
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

  app.use(express.static(path.join(__dirname, "ui/build")));
  app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "/ui/build/index.html")));

  app.use(
    morgan(morganFormat, {
      skip: (req, res) => res.statusCode < 400,
      stream: process.stderr
    })
  );

  app.use(
    morgan(morganFormat, {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.stdout
    })
  );

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    logger.error(err.message, { url: req.originalUrl });

    res.status(500);
    res.json({ error: err.message });
  });

  return app;
};
