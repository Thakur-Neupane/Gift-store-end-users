import { apiProcessor } from "../../services/axios";

const productEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/products";

// Function to create a new product
export const postNewProduct = (data) => {
  return apiProcessor({
    url: productEP,
    method: "post",
    data,
    isPrivate: true,
    showToast: true,
  });
};

// Function to get all products
export const getAllProducts = () => {
  return apiProcessor({
    url: productEP,
    method: "get",
    isPrivate: true,
  });
};

// Function to get a single product by id
export const getOneProduct = (_id) => {
  return apiProcessor({
    url: `${productEP}/${_id}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to delete a product
export const deleteProduct = (_id) => {
  return apiProcessor({
    url: `${productEP}/${_id}`,
    method: "delete",
    isPrivate: true,
    showToast: true,
  });
};

// Function to update a product
export const updateProduct = (_id, data) => {
  return apiProcessor({
    url: `${productEP}/update/${_id}`,
    method: "put",
    data,
    isPrivate: true,
    showToast: true,
  });
};

// Function to get a specific number of products
export const getProductsByCount = (count) => {
  return apiProcessor({
    url: `${productEP}/count/${count}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to fetch products with sorting and ordering
export const getProducts = (sort, order, limit) => {
  return apiProcessor({
    url: `${productEP}?sort=${sort}&order=${order}&limit=${limit}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to get similar products by product ID
export const getSimilarProducts = (_id) => {
  return apiProcessor({
    url: `${productEP}/related/${_id}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to get products by category ID
export const getProductsByCategory = (categoryId) => {
  return apiProcessor({
    url: `${productEP}/category/${categoryId}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to get products by subcategory ID
export const getProductsBySubCategory = (subCategoryId) => {
  return apiProcessor({
    url: `${productEP}/subcategory/${subCategoryId}`,
    method: "get",
    isPrivate: true,
  });
};

// Function to search products
export const searchProducts = (query) => {
  return apiProcessor({
    url: `${productEP}/search`,
    method: "post",
    data: { query },
    isPrivate: true,
  });
};

// Function to get highest rated products
export const getHighestRatedProducts = () => {
  return apiProcessor({
    url: `${productEP}/highest-rated`,
    method: "get",
    isPrivate: true,
  });
};

// Fetch products sorted by highest discount
export const fetchProductsByDiscount = async () => {
  const axiosObj = {
    method: "get",
    url: `${productEP}/discount`,
    isPrivate: false,
  };
  return apiProcessor(axiosObj);
};
