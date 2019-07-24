const { getEnvironment, getCollection } = require("./collections");
const { dbName } = getCollection();

module.exports = {
  get dbName () {
    return dbName;
  },

  get mongoUrl () {
    let developmentUrl = `mongodb://localhost:27017/${dbName}`;
    let productionUrl = process.env.MONGODB_URL;
    return getEnvironment() === "production" ? productionUrl : developmentUrl;
  }
};
