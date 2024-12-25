require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/dbconnection");
const router = require("./Routes/v1");
const userRoutes = require("./Routes/v1/userRoutes");
const { createShipping } = require("./Controller/Shipping_controller");
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

const port = 5000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

connectDB(); // Connect to the database