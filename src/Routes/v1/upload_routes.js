const express = require("express");
const Upload = require("../../Model/upload");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to save products.json
const filePath = path.join(__dirname, "../../products.json");

// Save products to the database and write to JSON file
router.post("/post_upload", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).send({ error: "Invalid products data" });
    }

    // Loop through each product to check if it exists in the database
    const updatedProducts = [];

    for (let product of products) {
      // Check if the product already exists based on title and category
      const existingProduct = await Upload.findOne({
        title: product.title,
        category: product.category,
      });

      if (existingProduct) {
        // If the product exists, update it
        existingProduct.price = product.price;
        existingProduct.img = product.img;
        updatedProducts.push(await existingProduct.save());
      } else {
        // If the product doesn't exist, insert a new product
        const newProduct = new Upload(product);
        updatedProducts.push(await newProduct.save());
      }
    }

    // Save products to JSON file
    const allProducts = await Upload.find(); // Fetch all products from the database

    fs.writeFileSync(filePath, JSON.stringify(allProducts, null, 2));

    // Respond with the updated products
    res.status(200).send({
      message: "Products saved or updated successfully!",
      data: updatedProducts,
    });
  } catch (error) {
    console.error("Error saving or updating products:", error);
    res.status(500).send({ error: "Failed to save or update products" });
  }
});

// Get all products from the database
router.get("/get_upload", async (req, res) => {
  try {
    const products = await Upload.find(); // Fetch all products from MongoDB
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get a product by ID
// Get a product by ID
router.get("/get_id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Upload.findById(id); // Use the correct model (Upload)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product); // Send the product as JSON
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
});


module.exports = router;
