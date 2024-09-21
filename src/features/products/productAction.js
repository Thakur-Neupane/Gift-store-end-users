import {
  getAllProducts,
  postNewProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
  getProducts,
  getSimilarProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  getProductsByCount,
  searchProducts,
  getHighestRatedProducts,
  fetchProductsByDiscount,
} from "./productAxios";
import {
  setProducts,
  setProduct,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSimilarProducts,
} from "./productSlice";

// Action to create a new product
export const createNewProductAction = (productData) => async (dispatch) => {
  try {
    await postNewProduct(productData);
    dispatch(getProductAction()); // Refresh the product list after creating a new product
  } catch (error) {
    console.error("Error creating new product:", error);
  }
};

// Action to get all products
export const getProductAction = () => async (dispatch) => {
  dispatch(fetchProductsStart()); // Start loading
  try {
    const response = await getAllProducts();
    if (response.status === "success") {
      dispatch(setProducts(response.products));
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Action to delete a product
export const deleteProductAction = (_id) => async (dispatch) => {
  try {
    const response = await deleteProduct(_id);
    if (response.status === "success") {
      dispatch(getProductAction()); // Refresh the product list
    } else {
      console.error("Error deleting product:", response.message);
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

// Action to get a single product by id
export const getOneProductAction = (_id) => async (dispatch) => {
  try {
    const response = await getOneProduct(_id);
    if (response.status === "success") {
      dispatch(setProduct(response.product));
    } else {
      console.error("Error fetching product:", response.message);
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Action to update a product
export const updateProductAction = (_id, productData) => async (dispatch) => {
  try {
    const response = await updateProduct(_id, productData);
    if (response.status === "success") {
      dispatch(getProductAction()); // Refresh the product list
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Action to get products by count
export const fetchProductsByCount = (count) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await getProductsByCount(count);
    if (response.status === "success") {
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Action to fetch products with sorting and ordering
export const fetchProductsAction = (sort, order, limit) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await getProducts(sort, order, limit);
    if (response.status === "success") {
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Fetch similar products
export const fetchSimilarProductsAction = (_id) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await getSimilarProducts(_id);
    if (response.status === "success") {
      dispatch(setSimilarProducts(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch similar products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Action creator to fetch products by category
export const getProductsByCategoryAction = (categoryId) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await getProductsByCategory(categoryId);
    if (response.status === "success") {
      dispatch(setProducts(response.products));
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Action creator to fetch products by subcategory
export const getProductsBySubCategoryAction =
  (subCategoryId) => async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const response = await getProductsBySubCategory(subCategoryId);
      if (response.status === "success") {
        dispatch(setProducts(response.products));
        dispatch(fetchProductsSuccess(response.products));
      } else {
        dispatch(fetchProductsFailure("Failed to fetch products."));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error.message || "An error occurred."));
    }
  };

// Search products by query
export const searchProductsAction = (query) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await searchProducts(query);
    if (response.status === "success") {
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch search results."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

// Action to fetch products sorted by highest rating
export const getHighestRatedProductsAction = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await getHighestRatedProducts();
    if (response.status === "success") {
      dispatch(fetchProductsSuccess(response.products));
    } else {
      dispatch(fetchProductsFailure("Failed to fetch highest-rated products."));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};

export const getProductsByDiscountAction = () => async (dispatch) => {
  try {
    const { status, products } = await fetchProductsByDiscount();
    if (status === "success") {
      dispatch(setProducts(products));
    } else {
      dispatch(setError("Failed to fetch products"));
    }
  } catch (error) {
    dispatch(fetchProductsFailure(error.message || "An error occurred."));
  }
};
