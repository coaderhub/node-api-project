const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Get All
router.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.json(Products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get One
router.get("/:id", getProduct, (req, res) => {
  res.json(res.Product);
});

//Create One
router.post("/", async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Patch One
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.title != null) {
    res.Product.title = req.body.title;
  }
  if (req.body.description != null) {
    res.Product.description = req.body.description;
  }
  if (req.body.price != null) {
    res.Product.price = req.body.price;
  }
  try {
    const updatedProduct = await res.Product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Put One
router.put("/:id", getProduct, async (req, res) => {
  try {
    const updatedProduct = await res.Product.set(req.body);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete One
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.Product.deleteOne();
    res.json({ message: "Product has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getProduct middleware
async function getProduct(req, res, next) {
  let Product;
  try {
    Product = await Product.findById(req.params.id);
    if (Product == null) {
      return res.status(404).json({ message: "Cannot find Product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.Product = Product;
  next();
}

module.exports = router;
