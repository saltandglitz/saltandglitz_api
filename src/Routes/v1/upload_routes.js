const express = require("express");
const Upload = require("../../Model/upload");
const fs = require("fs");
const path = require("path");
const { uploadController } = require("../../Controller");
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
      // Check if the product already exists based on SKU
      const existingProduct = await Upload.findOne({
        id: product.id,
      });

      if (existingProduct) {
        existingProduct.price14KT = product.price14KT;
        existingProduct.price18KT = product.price18KT;
        existingProduct.gender = product.gender;
        existingProduct.image01 = product.img;
        existingProduct.image02 = product.image02;
        existingProduct.image03 = product.image03;
        existingProduct.video = product.video;
        existingProduct.category = product.category;
        existingProduct.diamondprice = product.diamondprice;
        existingProduct.makingCharge14KT = product.makingCharge14KT;
        existingProduct.makingCharge18KT = product.makingCharge18KT;
        existingProduct.grossWt = product.grossWt;
        existingProduct.netWeight14KT = product.netWeight14KT;
        existingProduct.netWeight18KT = product.netWeight18KT;
        existingProduct.gst14KT = product.gst14KT;
        existingProduct.gst18KT = product.gst18KT;
        existingProduct.total14KT = product.total14KT;
        existingProduct.total18KT = product.total18KT;
        await existingProduct.save();
      } else {
        const newProduct = new Upload({
          id: product.id,
          title: product.title,
          gender: product.gender,
          price14KT: product.price14KT,
          price18KT: product.price18KT,
          image01: product.img,
          image02: product.image02,
          image03: product.image03,
          video: product.video,
          category: product.category,
          diamondprice: product.diamondprice,
          makingCharge14KT: product.makingCharge14KT,
          makingCharge18KT: product.makingCharge18KT,
          grossWt: product.grossWt,
          netWeight14KT: product.netWeight14KT,
          netWeight18KT: product.netWeight18KT,
          gst14KT: product.gst14KT,
          gst18KT: product.gst18KT,
          total14KT: product.total14KT,
          total18KT: product.total18KT,
        });
        await newProduct.save();
      }
    }

    // Save products to JSON file (optional, if needed)
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
    // Fetch all products from MongoDB
    const products = await Upload.find();

    // Modify the products array to rename _id to product_id
    const updatedProducts = products.map(product => {
      const { _id, ...body } = product.toObject();
      return { product_id: _id, ...body };
    });

    // Send the modified products array as response
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/get_upload_byGender", async (req, res) => {
  try {
    // Fetch all products from MongoDB
    const products = await Upload.find();

    // Separate products into male and female categories
    const maleProducts = products.filter(product => product.gender === "male");
    const femaleProducts = products.filter(product => product.gender === "female");

    // Modify the products arrays to rename _id to product_id
    const updatedMaleProducts = maleProducts.map(product => {
      const { _id, ...body } = product.toObject();
      return { product_id: _id, ...body };
    });

    const updatedFemaleProducts = femaleProducts.map(product => {
      const { _id, ...body } = product.toObject();
      return { product_id: _id, ...body };
    });

    // Send the modified male and female products arrays as response
    res.status(200).json({
      maleProducts: updatedMaleProducts,
      femaleProducts: updatedFemaleProducts
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

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

// category wise product show

router.post("/filterProduct", uploadController.filterProducts)
router.get("/get_similar/:id", async (req, res) => {
  try {
    const { id } = req.params; // Current product ID
    const currentProduct = await Upload.findById(id); // Fetch the current product

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch products of the same category excluding the current product
    const similarProducts = await Upload.find({
      category: currentProduct.category,
      _id: { $ne: id }, // Exclude current product
    });

    res.status(200).json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ message: "Failed to fetch similar products" });
  }
});


module.exports = router;
