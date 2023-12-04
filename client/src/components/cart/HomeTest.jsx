import { useDispatch, useSelector } from "react-redux";

import {useHistory} from 'react-router';
import { addToCart } from "../../features/cart/cartSlice";
// import { useGetAllProductsQuery } from "../slices/productsApi";
import { getAllProducts } from "../../features/products/productsSlice";
import { useEffect } from "react";
// import Cart from './Cart';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const HomeTest = () => {
  const { products, isLoading, error } = useSelector((state) => state.products);
  // console.log("products", products);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // history.push("/cart");
    if (history) {
      history.push("/cart");
    }
  };

  useEffect(() => {
    dispatch(getAllProducts())
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  return (
    
    <div className="home-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Unexpected error occurred: {error}</p>
      ) : (
        <>
          <Link to="/Cart"><Button className="goToCart">Cart</Button></Link>
          <h2>New Arrivals</h2>
          <div className="products">
            {products &&
              products?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.product_name}</h3>
                  <img src={product.product_images[0]} alt={product.name} />
                  <div className="details">
                    <span>{product.short_description}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeTest;
