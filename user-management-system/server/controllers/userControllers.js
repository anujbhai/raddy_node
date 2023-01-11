const mysql = require('mysql');

// MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// view users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    connection.query('SELECT * FROM users WHERE status = "active"', (error, rows) => {
      // release when done with connection
      connection.release();

      if (!error) {
        res.render('home', {rows});
      } else {
        console.log(error);
      }

      console.log('Data from user table: \n', rows);
    });
  });
};

// find users
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    let searchTerm = req.body.search;

    connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (error, rows) => {
      // release when done with connection
      connection.release();

      if (!error) {
        res.render('home', {rows});
      } else {
        console.log(error);
      }

      console.log('Data from user table: \n', rows);
    });
  });
};

// view/navigate add user form
exports.form = (req, res) => {
  res.render('add-user');
};

// add user
exports.create = (req, res) => {
  const {first_name, last_name, email, phone, comments, status} = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    connection.query(
      'INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',
      [first_name, last_name, email, phone, comments],
      (error, rows) => {
        // release when done with connection
        connection.release();

        if (!error) {
          res.render('add-user', {rows, alert: 'User added successfully!'});
        } else {
          console.log(error);
        }

        console.log('Data from user table: \n', rows);
      }
    );
  });
};

// edit user
exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    connection.query(
      'SELECT * FROM users WHERE id = ?',
      [req.params.id],
      (error, rows) => {
        // release when done with connection
        connection.release();

        if (!error) {
          res.render('edit-user', {rows, alert: 'User updated successfully!'});
          // res.render('edit-user');
        } else {
          console.log(error);
        }

        console.log('Data from user table: \n', rows);
      }
    );
  });
};
