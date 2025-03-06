const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true,
    default: new Date()
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
