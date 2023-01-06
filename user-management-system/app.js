require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const body_parser = require('body-parser');
const mysql = require('mysql');

const routes = require('./server/routes/user');

const app = express();
const port = process.env.PORT || 5000;

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected as id: ', connection.threadId);
});

// static
app.use(express.static('public'));

// templating engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// router
app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
