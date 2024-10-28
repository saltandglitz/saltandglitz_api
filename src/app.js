require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/dbconnection');
const router = require('./Routes/v1');
const userRoutes = require('./Routes/v1/userRoutes');
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Test Routes
app.get('/', (req, res) => {
  res.send('Welcome');
});
app.get('/hello', (req, res) => {
  res.send('Hello World');
});

// Routes
app.use('/v1', router); // Your other routes
app.use('/api/users', userRoutes); // User-related routes

// app.put('/api/users/update', (req, res) => {
//   const { name, email, mobile, pincode, birthday, anniversary, occupation, spouseBirthday } = req.body;

//   // Simple validation
//   if (!name || !email || !mobile) {
//       return res.status(400).json({ message: 'Please fill in all required fields' });
//   }

//   userProfile = { name, email, mobile, pincode, birthday, anniversary, occupation, spouseBirthday }; // Update user profile
//   res.status(200).json({ message: 'Profile updated successfully', userProfile });
// });

const port = 5000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

connectDB(); // Connect to the database
