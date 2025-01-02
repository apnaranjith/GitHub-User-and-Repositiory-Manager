const express = require('express');
const githubController = require('../controllers/githubController');

const router = express.Router();

// Save user data if not already present
router.post('/save-user', githubController.saveUserData);

// Find mutual followers for a user by username
router.get('/find-friends/:username', githubController.findMutualFollowers);

// Soft delete user by username
router.delete('/delete-user/:username', githubController.softDeleteUser);

// Update user data (like location, blog, bio)
router.put('/update-user/:username', githubController.updateUserData);

// Get all users (sorted by specific fields, for example: 'followers', 'created_at')
router.get('/all-users', githubController.getAllUsers);

// Fetch GitHub user data
router.get('/user/:username', githubController.FetchGithubUserData);

// Fetch the followers of a GitHub user
router.get('/followers/:username', githubController.fetchGithubFollowers);

// Fetch the following users of a GitHub user
router.get('/following/:username', githubController.FetchGithubFollowing);

//Fetch User Repositories for a given username
router.get('/repositories/:username', githubController. fetchUserRepositories);

// Fetch details of a specific repository for a user
router.get('/repository/:username/:repoName', githubController.fetchRepositoryDetails);

module.exports = router;
