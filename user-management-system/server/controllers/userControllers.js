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
        let removedUser = req.query.removed;

        res.render('home', {rows, removedUser});
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
          res.render('edit-user', {rows});
        } else {
          console.log(error);
        }

        console.log('Data from user table: \n', rows);
      }
    );
  });
};

// update user
exports.update = (req, res) => {
  const {first_name, last_name, email, phone, comments} = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    connection.query(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?',
      [first_name, last_name, email, phone, comments, req.params.id],
      (error, rows) => {
        // release when done with connection
        connection.release();

        if (!error) {
          // res.render('edit-user', {rows, alert: 'User updated successfully!'});
          pool.getConnection((err, connection) => {
            if (err) throw err;
            console.log('Connected as id: ', connection.threadId);

            connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, rows) => {
              // release when done with connection
              connection.release();

              if (!error) {
                res.render('edit-user', {rows, alert: "User updated successfully!"});
              } else {
                console.log(error);
              }

              console.log('Data from user table: \n', rows);
            });
          });
        } else {
          console.log(error);
        }

        console.log('Data from user table: \n', rows);
      }
    );
  });
};

// delete user
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    // connection.query(
    //   'DELETE FROM users WHERE id = ?',
    //   [req.params.id],
    //   (error, rows) => {
    //     // release when done with connection
    //     connection.release();

    //     if (!error) {
    //       res.redirect('/');
    //     } else {
    //       console.log(error);
    //     }

    //     console.log('Data from user table: \n', rows);
    //   }
    // );

    connection.query(
      'UPDATE users SET status = ? WHERE id = ?',
      ['removed', req.params.id],
      (error, rows) => {
        // release when done with connection
        connection.release();

        if (!error) {
          let removedUser = encodeURIComponent('User successfully removed!');
          res.redirect('/?removed=' + removedUser);
        } else {
          console.log(err);
        }

        console.log(`The data from users table: \n ${rows}`);
      }
    );
  });
};

// user details
exports.details = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected as id: ', connection.threadId);

    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (error, rows) => {
      // release when done with connection
      connection.release();

      if (!error) {
        res.render('user-details', {rows});
      } else {
        console.log(error);
      }

      console.log('Data from user table: \n', rows);
    });
  });
};