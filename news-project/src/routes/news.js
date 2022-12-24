const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get("", async (req, res) => {
  // res.render("news");
  try {
    const newsAPI = await axios.get("");
  } catch(error) {}
});

module.exports = newsRouter;
