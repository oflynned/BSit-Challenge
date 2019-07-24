#!/usr/bin/env node

/**
 * Module dependencies.
 */

require("babel-core/register");
require("babel-polyfill");

const logger = require("../config/winston");
const { getEnvironment } = require("../config/collections");
const { seedDb } = require("../common/seeder");

const namespace = "api.bin.www";

let app = require("../app");
let http = require("http");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3001");
app.set("port", port);
app.set("env", getEnvironment() === "production" ? "production" : "development");

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

(async () => {
  await seedDb();

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
})();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.error(`${namespace}#onError: ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${namespace}#onError: ${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  let addr = server.address();
  let bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;

  logger.info(`${namespace}#onListening: listening on ${bind}`);
}
