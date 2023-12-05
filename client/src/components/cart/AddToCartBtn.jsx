import {useHistory} from 'react-router';
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from 'react-redux';
// import { useGetAllProductsQuery } from "../slices/productsApi";
// import Cart from './Cart';
 
const AddToCartBtn = (product) => {
    const history = useHistory();
    const dispatch = useDispatch();
  
    const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      if (history) {
        history.push("/cart");
      }
    };
    
  return (
    <button onClick={() => handleAddToCart(product)}>
        Add To Cart
    </button>
  )
}

export default AddToCartBtn
