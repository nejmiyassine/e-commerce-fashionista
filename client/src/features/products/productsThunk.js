import { fetchProductsByCategory } from './productsSlice';

export const fetchProducts = (categoriesData) => async (dispatch) => {
    dispatch(fetchProductsByCategory(categoriesData));
};
