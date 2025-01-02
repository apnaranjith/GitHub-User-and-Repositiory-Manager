const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Set up routes
app.use('/api/github', githubRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
