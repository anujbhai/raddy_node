const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

app.use(expressLayouts);

// set views
// app.set("views", "./views");
app.set("layout", "./layout/full-width.ejs");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => console.info(`Listening on port ${port}`));

