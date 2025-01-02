const axios = require('axios');
const githubModel = require('../models/githubModel'); // Assuming you have a model to handle DB operations

// Fetch GitHub user data from API
const fetchGithubUserData = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      
      // Convert the 'created_at' from GitHub format to MySQL format
      const githubData = response.data;
      if (githubData.created_at) {
        githubData.created_at = githubData.created_at.replace('T', ' ').replace('Z', '');
      }
  
      return githubData;
    } catch (error) {
      throw new Error('GitHub API error');
    }
  };

// Fetch GitHub user data and modify the created_at field to match MySQL format
const FetchGithubUserData = async (req, res) => {
    const username = req.params.username; // Get the username from URL parameter
    try {
      // Send request to GitHub API to get user data
      const response = await axios.get(`https://api.github.com/users/${username}`);
      
      // Extract the GitHub data from the response
      const githubData = response.data;
  
      // Check if 'created_at' exists and modify the format
      if (githubData.created_at) {
        // Convert GitHub's ISO 8601 date-time format to MySQL DATETIME format
        githubData.created_at = githubData.created_at.replace('T', ' ').replace('Z', '');
      }
  
      // Return the modified GitHub user data
      res.json(githubData);
    } catch (error) {
      // If there's an error with the API call, send an error response
      res.status(500).json({ message: 'GitHub API error: ' + error.message });
    }
  };
  
  

// Save user data to the database if not already present
const saveUserData = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if user already exists in DB
    const existingUser = await githubModel.getUserByUsername(username);

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists in the database' });
    }

    // Fetch user data from GitHub
    const userData = await fetchGithubUserData(username);

    // Save the user data to the database
    await githubModel.saveUserData(userData);

    return res.status(201).json({ message: 'User data saved successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Fetch the followers of a GitHub user
const fetchGithubFollowers = async (req, res) => {
    const username = req.params.username;
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/followers`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching followers from GitHub' });
    }
  };
  
  // Fetch the following users of a GitHub user
  const FetchGithubFollowing = async (req, res) => {
    const username = req.params.username;
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/following`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching following users from GitHub' });
    }
  };
// Find mutual followers for a given user
const FetchGithubFollowers = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/followers`);
      return response.data;
    } catch (error) {
        console.error('GitHub API error: ', error.response ? error.response.data : error.message);
      throw new Error('Error fetching followers from GitHub');
    }
  };
  
  const fetchGithubFollowing = async (username) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/following`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching following users from GitHub');
    }
  };
  
  const findMutualFollowers = async (req, res) => {
    const { username } = req.params;
  
    try {
      // Fetch the list of followers and following users
      const followersData = await FetchGithubFollowers(username);
      const followingData = await fetchGithubFollowing(username);
  
      // Extract the usernames (login field)
      const followers = followersData.map(follower => follower.login);
      const following = followingData.map(following => following.login);
  
      // Find mutual followers (those who are in both lists)
      const mutualFollowers = followers.filter(follower => following.includes(follower));
  
      return res.status(200).json({
        message: 'Mutual followers found',
        mutualFollowers: mutualFollowers,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };// Soft delete a user by setting 'deleted' to TRUE
const softDeleteUser = async (req, res) => {
    const { username } = req.params;
  
    try {
      // Perform soft delete in DB
      await githubModel.softDeleteUser(username);
  
      return res.status(200).json({ message: `User ${username} marked as deleted` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
    // Update fields like 'location', 'bio', and 'blog' for a given user
const updateUserData = async (req, res) => {
    const { username } = req.params;
    const updatedData = req.body; // Expect fields like 'location', 'bio', etc. from request body
  
    try {
      // Update user data in DB
      await githubModel.updateUserData(username, updatedData);
  
      return res.status(200).json({ message: `User ${username} updated successfully` });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  // Get all users from the database sorted by a given field
const getAllUsers = async (req, res) => {
    const { sortBy } = req.query; // Get sorting field from query parameter (e.g., ?sortBy=followers)
  
    try {
      // Retrieve and sort users from the database based on the sort field
      const users = await githubModel.getAllUsers(sortBy);
  
      return res.status(200).json({ users: users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


// Fetch the repositories of a GitHub user
const fetchUserRepositories = async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch the list of repositories from GitHub
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    
    // If successful, return the list of repositories
    const repositories = response.data;
    
    return res.status(200).json(repositories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching repositories from GitHub' });
  }
};
// Fetch details of a specific repository for a given user
const fetchRepositoryDetails = async (req, res) => {
    const { username, repoName } = req.params;
  
    try {
      // Fetch repository details from GitHub API
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
  
      // If successful, return the repository details
      const repositoryDetails = response.data;
  
      return res.status(200).json(repositoryDetails);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching repository details from GitHub' });
    }
  };
  

  module.exports = {
    FetchGithubUserData,
    saveUserData,
    findMutualFollowers,
    softDeleteUser,
    updateUserData,
    getAllUsers,
    fetchGithubFollowers,
    FetchGithubFollowing,
    fetchUserRepositories,
    fetchRepositoryDetails
  };