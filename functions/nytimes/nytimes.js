const functions = require("firebase-functions");
// const {
//     logger,
// } = require("firebase-functions");
const axios = require("axios");

exports.getStories = functions.runWith({
    timeoutSeconds: 540,
}).https.onCall(async (data, context) => {
    const result = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NY_API_KEY}`,
        {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    // logger.log("RESPONSE", result);
    if (result && result.data && result.data.results) {
        const r = result.data.results;
        return r;
    }
    return [];
});

exports.getArticles = functions.runWith({
    timeoutSeconds: 540,
}).https.onCall(async (data, context) => {
    const result = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NY_API_KEY}`,
        {
            headers: {
                "Content-Type": `application/json`,
            },
        });
    // logger.log("RESPONSE", result);
    if (result && result.data && result.data.response && result.data.response.docs) {
        const r = result.data.response.docs;
        return r;
    }
    return [];
});
