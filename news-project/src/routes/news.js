const axios = require("axios");
const express = require("express");
const newsRouter = express.Router();

const APP_ID = "63aaa1965340fa8e57f8b17e";

newsRouter.get("/", async (req, res) => {
  try {
    const newsAPI = await axios.get("https://dummyapi.io/data/v1/post", {
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
        "app-id": APP_ID
      }
    });

    res.render("news", {articles: newsAPI.data.data});
    // res.send(newsAPI);
  } catch (err) {
    if (err.response) {
      res.render("news", {articles: null});
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request){
      res.render("news", {articles: null});
      console.log(err.request);
    } else {
      res.render("news", {articles: null});
      console.error("Error", err.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let articleId = req.params.id;

  try {
    const newsAPI = await axios.get(`https://dummyapi.io/data/v1/post/${articleId}`, {
      headers: {
        "Accept-Encoding": "gzip,deflate,compress",
        "app-id": APP_ID
      }
    });

    res.render("news-single", {article: newsAPI.data});
    // res.send(newsAPI);
  } catch (err) {
    if (err.response) {
      res.render("news-single", {article: null});
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request){
      res.render("news-single", {article: null});
      console.log(err.request);
    } else {
      res.render("news-single", {article: null});
      console.error("Error", err.message);
    }
  }
});

module.exports = newsRouter;
