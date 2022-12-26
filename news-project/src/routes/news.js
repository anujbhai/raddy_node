const axios = require("axios");
const express = require("express");
const newsRouter = express.Router();

const API_KEY = "1c824eb913f944c89a1ac8f305ad7752";

newsRouter.get("/", async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`, {
      headers: {
        "Accept-Encoding": "gzip,deflate,compress"
      }
    });

    res.render("news", {articles: newsAPI.data.articles});
    // res.send(newsAPI.data);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request){
      console.log(err.request);
    } else {
      console.error("Error", err.message);
    }
  }
});

module.exports = newsRouter;
