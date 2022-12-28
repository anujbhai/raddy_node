const express = require("express");
const app = express();
const PORT = 5000;

// set templating engine
app.set("view engine", "ejs");

// navigation
app.get("", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
})

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
