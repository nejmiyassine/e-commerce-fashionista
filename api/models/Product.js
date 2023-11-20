const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function generateSKU() {
  // Generate a random alphanumeric string for SKU
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';
  for (let i = 0; i < 8; i++) {
    sku += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }
  return sku;
}
let productSchema = new Schema({
  sku: {
     type: String ,
      unique: true
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

productSchema.pre('save', async function (next) {
  // Generate SKU only if it's a new product (not updating)
  if (!this.isModified('sku') || !this.sku) {
    this.sku = generateSKU();
  }
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;