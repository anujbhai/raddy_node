require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'raddy_node_crud',
  port: 3306,
});

// get all items
app.get('/beers', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connection id: ${connection.threadId}`);

    // query(string, callback)
    connection.query('SELECT * FROM beers', (error, rows) => {
      connection.release(); // return the connecion to pool

      if (!error) {
        res.send(rows);
      } else {
        console.log(error);
      }
    });
  });
});

// get an item by id
app.get('/beers/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connection id: ${connection.threadId}`);

    // query(string, callback)
    connection.query('SELECT * FROM beers WHERE id = ?', [req.params.id], (error, rows) => {
      connection.release(); // return the connecion to pool

      if (!error) {
        res.send(rows);
      } else {
        console.log(error);
      }
    });
  });
});

// delete an item
app.delete('/beers/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connection id: ${connection.threadId}`);

    // query(string, callback)
    connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (error) => {
      connection.release(); // return the connecion to pool

      if (!error) {
        res.send(`Beer with the record ID: ${req.params.id} has been removed.`);
      } else {
        console.log(error);
      }
    });
  });
});

// add a new item
app.post('/beers', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connection id: ${connection.threadId}`);

    const params = req.body;

    // query(string, callback)
    connection.query('INSERT INTO beers SET ?', params, (error) => {
      connection.release(); // return the connecion to pool

      if (!error) {
        res.send(`Beer with the record ID: ${params.name} has been added.`);
      } else {
        console.log(error);
      }
    });

    console.log(req.body);
  });
});

// Update an item
app.put('/beers', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connection id: ${connection.threadId}`);

    const {
      id, name, tagline, description, image,
    } = req.body;

    // query(string, callback)
    connection.query(
      'UPDATE beers SET name = ?, tagline = ?, description = ?, image = ? WHERE id = ?',
      [name, tagline, description, image, id],
      (error) => {
        connection.release(); // return the connecion to pool

        if (!error) {
          res.send(`Beer with the record id: ${id} has been updated.`);
        } else {
          console.log(error);
        }
      },
    );

    console.log(req.body);
  });
});

// listen to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
