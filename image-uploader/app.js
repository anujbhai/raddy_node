const express = require("express");
const {engine} = require("express-handlebars");

const app = express();
const port = process.env.PORT || 5000;

// templating engine
app.engine("hbs", engine({
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", "hbs");

app.get("", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

