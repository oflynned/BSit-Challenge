import { environments } from "./environments";

require("dotenv").config({ path: "../.env" });

function classifyEnvironment (env) {
  let dbName = env === "production" ? "bsit" : `bsit_${env}`;
  return {
    "dbName": dbName,
    "env": env
  };
}

export const getEnvironment = () => {
  const hasEnvironment = process.env && process.env.ENVIRONMENT;
  let reportedEnvironment = hasEnvironment ? process.env.ENVIRONMENT.toLowerCase() : "development";
  return environments.includes(reportedEnvironment) ? reportedEnvironment : "development";
};

export const getCollection = () => {
  let env = getEnvironment();
  return classifyEnvironment(env);
};
