require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/dbconnection");
const router = require("./Routes/v1");
const userRoutes = require("./Routes/v1/userRoutes");
const { createShipping } = require("./Controller/Shipping_controller");
const Recently = require("./Model/recently");
const app = express();  

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Test Routes
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/v1", router); // Product routes
app.use("/api/users", userRoutes); // User-related routes



// app.get('/api/recently-viewed', async (req, res) => {
//   try {
//     // Fetch the last 5 recently viewed products
//     const recentlyViewed = await Recently.find().limit(5); // You can adjust the limit based on your needs
//     res.json(recentlyViewed);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching recently viewed products' });
//   }
// });

// // Example route for adding a product (just in case you need it)
// app.post('/api/products', async (req, res) => {
//   const { title, price, image01 } = req.body;
  
//   try {
//     if (!title || !price || !image01) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const newProduct = new Recently({
//       title,
//       price,
//       image01,
//     });
    
//     await newProduct.save();
//     res.status(201).json({ message: 'Product added successfully', product: newProduct });
//   } catch (err) {
//     console.error('Error adding product:', err);
//     res.status(500).json({ error: 'Error adding product', details: err.message });
//   }
// });


const port = 5000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

connectDB(); // Connect to the database