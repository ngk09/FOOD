const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');  // To simulate requests from the client

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Dummy data for menu and users
let menuItems = [];
let users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' }
];

// POST endpoint to add a menu item
app.post('/menu', (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).send('All fields are required.');
  }
  const newItem = { name, price, category };
  menuItems.push(newItem);
  res.status(201).send(newItem);
});

// GET endpoint to fetch the menu
app.get('/menu', (req, res) => {
  res.status(200).send(menuItems);
});

// POST endpoint for login (authentication)
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    return res.status(200).send({ message: 'Login successful' });
  } else {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Example: Automatically send a POST request to the /menu endpoint (simulate client-side)
axios.post('http://localhost:3000/menu', {
  name: 'Pizza',
  price: 10,
  category: 'Food'
})
.then(response => {
  console.log('Menu item added:', response.data);
})
.catch(error => {
  console.error('Error adding menu item:', error);
});

// Example: Simulate login by sending POST request to /auth/login
axios.post('http://localhost:3000/auth/login', {
  username: 'user1',
  password: 'password1'
})
.then(response => {
  console.log('Login success:', response.data);
})
.catch(error => {
  console.error('Login error:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});