import { setSubCats } from "../subcategories/subCatSlice";
import {
  deleteCategory,
  getACategory,
  getAllCategories,
  getCategorySubs,
  postNewCategory,
  updateCategory,
} from "./catAxios";
import { setCategory, setCats } from "./catSlice";

// Action creator to create a new category
export const createNewCategoryAction = (catData) => async (dispatch) => {
  try {
    const response = await postNewCategory(catData);
    if (response.status === "success") {
      dispatch(getCategoryAction()); // Refresh categories after creation
      return true;
    }
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Action creator to fetch all categories
export const getCategoryAction = () => async (dispatch) => {
  try {
    const response = await getAllCategories();
    if (response.status === "success") {
      dispatch(setCats(response.categories));
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Action creator to update a category
export const updateCategoryAction = (slug, category) => async (dispatch) => {
  try {
    const response = await updateCategory(slug, category);
    if (response.status === "success") {
      dispatch(getCategoryAction()); // Refresh categories after update
      return true;
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Action creator to delete a category
export const deleteCategoryAction = (slug) => async (dispatch) => {
  try {
    const response = await deleteCategory(slug);
    if (response.status === "success") {
      dispatch(getCategoryAction());
    }
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Action creator to fetch subcategories for a category
export const getCategorySubsAction = (_id) => async (dispatch) => {
  try {
    const response = await getCategorySubs(_id);
    if (response.status === "success") {
      dispatch(setSubCats(response.subCategories));
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
  }
};

// Action creator to fetch a single category by slug
export const getACategoryAction = (slug) => async (dispatch) => {
  try {
    const response = await getACategory(slug);
    if (response.status === "success") {
      dispatch(setCategory(response.category));
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
  }
};
