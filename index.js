const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Replace these database credentials with your MySQL database credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'dpdzero',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Create a basic in-memory object to simulate the database
const users = {};
const dataStore = {};

// Middleware
app.use(bodyParser.json());

// 1. User Registration API
app.post('/api/register', (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body;

  // Basic validation (you can add more checks as needed)
  if (!username || !email || !password || !full_name) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please provide all required fields: username, email, password, full_name.',
    });
  }

  // Check if username already exists
  if (users[username]) {
    return res.status(409).json({
      status: 'error',
      code: 'USERNAME_EXISTS',
      message: 'The provided username is already taken. Please choose a different username.',
    });
  }

  // Check if email already exists
  if (Object.values(users).find((user) => user.email === email)) {
    return res.status(409).json({
      status: 'error',
      code: 'EMAIL_EXISTS',
      message: 'The provided email is already registered. Please use a different email address.',
    });
  }

  // Insert the user into the "database" (in-memory object)
  const userId = Date.now().toString();
  users[username] = { user_id: userId, username, email, full_name, age, gender };

  return res.status(201).json({
    status: 'success',
    message: 'User successfully registered!',
    data: users[username],
  });
});

// 2. Generate Token API
// (In a real-world scenario, you would use a proper authentication mechanism like JWT)
app.post('/api/token', (req, res) => {
  const { username, password } = req.body;

  // Basic validation (you can add more checks as needed)
  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      code: 'MISSING_FIELDS',
      message: 'Missing fields. Please provide both username and password.',
    });
  }

  // Check if the user exists and the password matches (again, this is a basic example)
  const user = Object.values(users).find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid credentials. The provided username or password is incorrect.',
    });
  }

  // Generate a dummy access token (this should be replaced with a proper authentication mechanism)
  const accessToken = 'YOUR_GENERATED_ACCESS_TOKEN';
  return res.status(200).json({
    status: 'success',
    message: 'Access token generated successfully.',
    data: {
      access_token: accessToken,
      expires_in: 3600, // 1 hour in seconds
    },
  });
});

// 3. Store Data API
app.post('/api/data', (req, res) => {
  const { authorization } = req.headers;
  const { key, value } = req.body;

  // Validate the access token (you should implement a proper authentication middleware)
  if (authorization !== 'YOUR_GENERATED_ACCESS_TOKEN') {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid access token provided',
    });
  }

  // Basic validation (you can add more checks as needed)
  if (!key || !value) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please provide both key and value.',
    });
  }

  // Check if the key already exists (for update cases)
  if (dataStore[key]) {
    return res.status(409).json({
      status: 'error',
      code: 'KEY_EXISTS',
      message: 'The provided key already exists in the database. To update an existing key, use the update API.',
    });
  }

  // Store the data in the "database" (in-memory object)
  dataStore[key] = value;

  return res.status(201).json({
    status: 'success',
    message: 'Data stored successfully.',
  });
});

// 4. Retrieve Data API
app.get('/api/data/:key', (req, res) => {
  const { authorization } = req.headers;
  const { key } = req.params;

  // Validate the access token (you should implement a proper authentication middleware)
  if (authorization !== 'YOUR_GENERATED_ACCESS_TOKEN') {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid access token provided',
    });
  }

  // Retrieve the value from the "database" (in-memory object)
  const value = dataStore[key];

  if (value) {
    return res.status(200).json({
      status: 'success',
      data: {
        key,
        value,
      },
    });
  } else {
    return res.status(404).json({
      status: 'error',
      code: 'KEY_NOT_FOUND',
      message: 'The provided key does not exist in the database.',
    });
  }
});

// 5. Update Data API
app.put('/api/data/:key', (req, res) => {
  const { authorization } = req.headers;
  const { key } = req.params;
  const { value } = req.body;

  // Validate the access token (you should implement a proper authentication middleware)
  if (authorization !== 'YOUR_GENERATED_ACCESS_TOKEN') {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid access token provided',
    });
  }

  // Basic validation (you can add more checks as needed)
  if (!value) {
    return res.status(400).json({
      status: 'error',
      code: 'INVALID_REQUEST',
      message: 'Invalid request. Please provide the new value.',
    });
  }

  // Check if the key exists (for update cases)
  if (!dataStore[key]) {
    return res.status(404).json({
      status: 'error',
      code: 'KEY_NOT_FOUND',
      message: 'The provided key does not exist in the database.',
    });
  }

  // Update the value in the "database" (in-memory object)
  dataStore[key] = value;

  return res.status(200).json({
    status: 'success',
    message: 'Data updated successfully.',
  });
});

// 6. Delete Data API
app.delete('/api/data/:key', (req, res) => {
  const { authorization } = req.headers;
  const { key } = req.params;

  // Validate the access token (you should implement a proper authentication middleware)
  if (authorization !== 'YOUR_GENERATED_ACCESS_TOKEN') {
    return res.status(401).json({
      status: 'error',
      code: 'INVALID_TOKEN',
      message: 'Invalid access token provided',
    });
  }

  // Check if the key exists
  if (!dataStore[key]) {
    return res.status(404).json({
      status: 'error',
      code: 'KEY_NOT_FOUND',
      message: 'The provided key does not exist in the database.',
    });
  }

  // Delete the data from the "database" (in-memory object)
  delete dataStore[key];

  return res.status(200).json({
    status: 'success',
    message: 'Data deleted successfully.',
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
