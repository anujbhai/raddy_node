const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;


// Cross Origin Resource Sharing
const whitelist = ["http://localhost:5000", "http://192.168.1.37:5000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// static files
app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
// app.use("/img", express.static(__dirname + "public/img"));
// app.use("/js", express.static(__dirname + "public/js"));

// templating engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// parsing middleware
app.use(bodyParser.urlencoded({extended: true}));

// routes
const newsRouter = require("./src/routes/news");

app.use("/", newsRouter);
app.use("/post", newsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
