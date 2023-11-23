const Product = require("../models/Product");

// exports.addProduct = async (req, res) => {
//   try {
//     const newProduct = await Product.create(req.body);
//     return res.status(200).json({
//       status: 200,
//       message: "product created successfully",
//       data: newProduct,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({message: error?.message});
//   }
// };
exports.addProduct = async (req, res) => {
  try {
    const { product_name, price, discount_price, options, category_id, short_description, long_description, quantity, product_images } = req.body;

    const newProduct = await Product.create({
      product_name,
      price,
      discount_price,
      options,
      category_id,
      short_description,
      long_description,
      quantity,
      product_images, // Make sure product_images is an array of URLs
    });

    return res.status(200).json({
      status: 200,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error?.message });
  }
};
//search for products
exports.searchforProduct = async (req, res) => {
  try {
    const { query, page } = req.query;
    const itemsPerPage = 10;
    const pageNumber = parseInt(page, 10) || 1;

    // Define the search query for productname
    const searchQuery = {
      product_name: { $regex: new RegExp(query, "i") },
    };
    const skip = (pageNumber - 1) * itemsPerPage;

    // Project only the specified fields in the query
    const products = await Product.find(searchQuery)
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given search query" });
    } 
    return res.status(200).json({  
        status:200,
        data:products });
  } catch (error) {
    return res.json({message: error?.message});

  }
};


// get products by id 
exports.getProductID = async (req, res) => {
try {
  const id = req.params.id;
  const product = await Product.findById(id)
  .populate('category_id').exec();
  if (!product){
    res.status(404).json({message: "ProductiD not found"})
  }

  return res.status(200).json({
    status: 500,
    data:product,
    message: "Product found",
  })        
} catch (error) {
  console.error(error); 
  return res.json({message: error?.message});
}   
}
// get list of products
exports.listProduct = async (req, res) => {
    try {
         const page  = req.query.page||1;
        const itemsPerPage = 10;
        const pageNumber = parseInt(page, 10) || 1;
        const skip = (pageNumber - 1) * itemsPerPage;
    
    
        const products = await Product.find()
        .populate('category_id')
        .skip(skip).limit(itemsPerPage);
      
        return res.status(200).json({
          status: 200,
          data: products,
          message: "Products retrieved successfully",
        });  
    } catch (error) {
        console.error(error); 
        return res.json({message: error?.message});
      }
    }

// update product
exports.updateProduct = async (req, res) => {

  try {
    const idProduct = req.params.id
    const updatedProduct = req.body
    console.log(updatedProduct)
    const product= await  Product.findOneAndUpdate({_id:idProduct},updatedProduct,{new:true});
    if (!product){
      return res.status(404).json({ message: "product not found" });
    }

      return res.status(200).send({
        data: product,
        message:"product updated successfully"})
  } catch (error) {
    console.log(error); 
    return res.json({message: error?.message});

  }
}

// delete product 
exports.deleteProduct = async (req, res) => {
  try {
     const idProduct = req.params.id
     const deletedproduct = await Product.findByIdAndDelete(idProduct).exec();
       if(!deletedproduct){
        return  res.status(404).json({
          status: 404,
          message: "product not found"})
        }
      return res.status(200).json({ 
        status:200,
        data: deletedproduct,
        message: "Product deleted successfully" });
    
  } catch (error) {
    console.error(error); 
    return res.json({message: error?.message});
  }
}