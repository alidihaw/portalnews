/* eslint-disable max-len */
const {logger} = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();
logger.log("process.env.env", process.env.ENV);
// const serviceAccount = require("./credentials/service-account.json");
// logger.log("serviceAccount", serviceAccount);
admin.initializeApp();


const nyFunctions = require("./nytimes/nytimes");
exports.getStories = nyFunctions.getStories;
exports.getArticles = nyFunctions.getArticles;
