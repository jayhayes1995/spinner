// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Optional: API endpoint example
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Spinner.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});