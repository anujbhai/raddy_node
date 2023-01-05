require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const body_parser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'raddy_node_crud',
  port: 3306,
});

// static
app.use(express.static('public'));

// templating engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// router
app.get('', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
