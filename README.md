# GitHub-User-and-Repositiory-Manager
Full-Stack App with Node.js, Express, React, and Database Integration
GitHub User and Repository Manager Documentation
1.Project Overview
Objective: The GitHub User and Repository Manager is a full-stack application that enables users to:
- Fetch and display GitHub user details and repositories.
- Save user details to a database for quick access.
- Manage user data with options to search, update, sort, and soft-delete records.
- Identify mutual followers and establish user friendships based on mutual follows.
Features
1.Backend Features:
   - Fetch GitHub user details using the GitHub API.
   - Save and manage user data in a database to prevent redundant API calls.
   - Identify and save mutual followers as friends.
   - Search user data based on fields like username.
   - Soft delete user records from the database based on username.
   - Update user details such as bio, location, and blog.
   - Return a sorted list of users based on various fields (e.g., followers, repositories).

2. Frontend Features:
   - Input field to accept a GitHub username and fetch data.
   - Display user details along with their repositories.
   - Navigate to detailed repository information for selected repositories.
   - View followers of a user and navigate to their repository lists.
   - Seamless navigation between pages while avoiding redundant API calls.
   - Simple and intuitive design replicating the given reference images.
2.Technology Stack
Backend:
- Node.js: Runtime environment for building server-side applications.
- Express.js: Web framework for routing and API creation.
- Database: Any relational database (e.g., PostgreSQL, MySQL, SQLite).
- Axios: For making HTTP requests to the GitHub API.

Frontend:
- React: Library for building user interfaces using React Hooks.
- React Router: For navigation between different components.
- Axios: For API calls to the backend.

Other Tools:
- GitHub API: Data source for GitHub user and repository details.
- Git: Version control for project management.
3. Setup Instructions 
Prerequisites
Before you begin setting up the GitHub user and repository manager, ensure you have the following installed and set up:
1. Node.js (v14.x or later)
Download and install Node.js from the official website: https://nodejs.org.
You can verify the installation by running the following commands in your terminal:
node -v
2. npm (v6.x or later)
npm (Node Package Manager) is bundled with Node.js, so it should be installed automatically.
Verify the version of npm by running:   npm -v
3. Git
•	Install Git from https://git-scm.com/
•	Verify Git installation by running: git –version
4.Setting Up the GitHub User and Repository Manager
Backend Setup
•	Step 1: Clone the Repository
Start by cloning the project repository to your local machine. If you already have a GitHub repository for the project, you can clone it using:
git clone https://github.com/apnaranjith/GitHub-User-and-Repositiory-Manager.git

cd GitHub-User-and-Repositiory-Manager

•	Step 2: Install Dependencies
In the project root directory, run the following command to install all required dependencies listed in package.json: 
npm install
This will install all the required Node.js packages for the project, including Express, MySQL, etc.

.

•	Step 3: Setup MySQL Database
Create a MySQL database: In your MySQL server, create a database (e.g.,work) and two tables: users and blogs.
 

 

Step 4: Run the Application
Once your environment is set up and all dependencies are installed, you can start the application.
Run the application:
o	node index.js-to run the application normally
o	By default, the application will start on http://localhost:5000.
Once the application is running:
Test the APIs using tools like Postman.
Frontend Setup
a.	npm create vite@latest
b.	cd assignment
 Install dependencies:  npm install
c.	To run the application
npm run dev

8. RESTful APIs

1.	Retrieve All Users
o	Endpoint: /all-users
o	Method: GET
o	Description: Returns a sorted list of users based on various fields (e.g., followers, repositories).
 





Fetch the Followers of a GitHub User

o	Endpoint: /followers/:username
o	Method: GET
o	Description: To fetch the followers of a GitHub User
 



Fetch user repositories for a given name

o	Endpoint: /following/:username
o	Method: GET
o	Description: Fetches the user repositories for a given name.
  
	
Fetch User Repositories For A Given Username
o	Endpoint: /repositories/keerthana
o	Method: GET
o	Description: Fetches the user repositories for a given username
 
	Get All Users
o	Endpoint: /all-users?sortBy=followers
o	Method: GET
o	Description: Gets all the users
 



Find Mutual Friends
o	Endpoint: find-friends/aks
o	Method: GET
o	Description: Identify mutual followers and establish user friendships based on mutual follows.
 
Save user if not already present
o	Endpoint: /save-user
o	Method: POST
o	Description: Saves user details to a database for quick access.
 


Delete a User
o	Endpoint: /delete-user/pranith
o	Method: DELETE
o	Description: Soft delete user records from the database based on username.
 

	Update the User
o	Endpoint: /update-user/keerthana
o	Method: PUT
o	Description: Updates user details such as bio, location and blog.
 


Fetch details of a Specific Repository based on Repo Name of a User

o	Endpoint: /keerthana/ChristmasSimulator
o	Method: GET
Description:  Fetches details of a Specific Repository based on Repo Name of a User

 


9.  Additional Notes
•	Error Handling: Ensure all API endpoints and UI interactions gracefully handle errors, such as invalid GitHub usernames or unavailable data.
•	Caching: Implement backend and frontend caching to optimize performance and reduce redundant API calls.
•	Scalability: The architecture supports easy scalability to handle more users and data.
•	Security: Use environment variables to store sensitive data and follow best practices for secure API consumption.
•	Testing: Add unit and integration tests for both backend and frontend to ensure functionality.

10. Conclusion
The GitHub User and Repository Manager is a robust application designed to efficiently interact with the GitHub API while minimizing redundant calls. By combining a user-friendly frontend with a powerful backend, it simplifies the management of GitHub user data, repositories, and connections. Its modular design and scalability ensure adaptability for future enhancements and broader use cases.


