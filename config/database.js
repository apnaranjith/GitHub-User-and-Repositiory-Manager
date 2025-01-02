const mysql = require('mysql2');

// Set up the connection
const db = mysql.createConnection({
  host: 'localhost',       // Replace with your MySQL host
  user: 'root',            // Replace with your MySQL username
  password: 'Ra16nj08it01h@',            // Replace with your MySQL password
  database: 'github_users' // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db;
