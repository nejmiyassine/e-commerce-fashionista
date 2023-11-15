const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  sku: {
     type: String ,
    required: true
  },
  product_image: {
     type: String ,
  },
  product_name: { 
    type: String ,
    required: true
  },
  category_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  short_description: {
     type: String ,
    required: true
  },
  long_description: {
     type: String ,
    required: true
  },
  price: {
     type: Number ,
    required: true
  },
  quantity: {
     type: Number
  },
  discount_price: {
    type: Number ,
    required: true
  },
  options: {
     type: Array 
  },
  active: {
     type: Boolean ,
    default: false 
  },
  seller_id: {
     type: Number 
    },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;