const db = require('../config/database');

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ? AND deleted = FALSE', [username], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  };
  const saveUserData = (userData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO users (username,  location, bio, blog, public_repos, followers, following, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        userData.login, 
        
        userData.location,
        userData.bio,
        userData.blog,
        userData.public_repos,
        userData.followers,
        userData.following,
        userData.created_at
      ];
      db.query(query, values, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };
  const updateUserData = (username, updatedData) => {
    return new Promise((resolve, reject) => {
      const { location, blog, bio } = updatedData;
      const query = `
        UPDATE users
        SET location = ?, blog = ?, bio = ?
        WHERE username = ? AND deleted = FALSE
      `;
      db.query(query, [location, blog, bio, username], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };
  const softDeleteUser = (username) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET deleted = TRUE WHERE username = ? AND deleted = FALSE', [username], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };

  const getAllUsers = (sortBy) => {
    const allowedSortFields = ['username', 'location', 'created_at', 'public_repos', 'followers', 'following'];

    return new Promise((resolve, reject) => {
      // Check if the provided sortBy is in the list of allowed fields
      if (!allowedSortFields.includes(sortBy)) {
        return reject(new Error(`Invalid sort field: ${sortBy}`));
      }
  
      // Safely construct the query using a valid field
      const query = `SELECT * FROM users WHERE deleted = FALSE ORDER BY ${sortBy} DESC`;
  
      db.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  };
  
    
  

module.exports = {
  saveUserData,
  getUserByUsername,
  updateUserData,
  softDeleteUser,
  getAllUsers
};
