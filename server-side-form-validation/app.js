const express = require("express");
const bodyparser = require("body-parser");
const {check, validationResult} = require("express-validator");
const { render } = require("ejs");

const app = express();
const PORT = 5000;

// set templating engine
app.set("view engine", "ejs");

const urlEncodedParser = bodyparser.urlencoded({extended: false});

// navigation
app.get("", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", urlEncodedParser, [
  check("username", "Username must be more than 3 letters")
    .exists()
    .isLength({min: 3}),
  check("email", "Email is invalid")
    .exists()
    .isEmail()
    .normalizeEmail()
], (req, res) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    // return res.status(422).jsonp(errs.array());
    const alert = errs.array();

    res.render("register", {alert});
  }


  // res.json(req.body);
});

app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});
