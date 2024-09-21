import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "antd/dist/reset.css";
import "./index.css"; // Ensure this imports Tailwind CSS

// Import pages and components
import Landing from "./pages/landing page/Landing";
import ErrorPage from "./pages/error page/ErrorPage";
import SignUp from "./pages/user/SignUp";
import SignIn from "./pages/user/SignIn";
import ProfileLanding from "./pages/user/profileLanding/ProfileLanding";
import Cart from "./pages/cart/Cart";
import ForgetPassword from "./pages/user/ForgetPassword";
import UserVerification from "./pages/user/UserVerification";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Service from "./pages/services/Service";
import Faq from "./pages/faq/Faq";
import Sales from "./pages/sale/Sales";
import ProfilePage from "./pages/user/profileLanding/ProfilePage";
import ChangePassword from "./pages/user/ChangePassword";
import EditProfile from "./pages/user/EditProfile";
import Product from "./pages/products/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubCategory from "./pages/subcategory/SubCategory";
import SearchResultsPage from "./components/search/SearchResultPage";
import Checkout from "./pages/checkout/Checkout";
import Layout from "./pages/layout/Layout";

// Import actions
import {
  autoLoginAction,
  fetchUserProfileAction,
} from "./features/users/userAction";
import Payment from "./pages/payment/Payment";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userInfo);

  // Auto login and fetch user profile on app load
  useEffect(() => {
    dispatch(autoLoginAction());
    dispatch(fetchUserProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      // Redirect to intended page if exists
      if (location.state?.from) {
        navigate(location.state.from, { replace: true });
      }
    }
  }, [user, location.state, navigate]);

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/profile" element={<ProfileLanding />} />
          <Route path="/Userprofile" element={<ProfilePage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/change-password/:_id" element={<ChangePassword />} />
          <Route path="/edit-profile/:_id" element={<EditProfile />} />
          <Route path="/verify-user" element={<UserVerification />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/sale" element={<Sales />} />
          <Route path="/product/:_id" element={<Product />} />
          <Route path="/products/:slug" element={<CategoryHome />} />
          <Route path="/subcategory/:subCategoryId" element={<SubCategory />} />
          <Route path="/category/:categoryId" element={<CategoryHome />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout/:_id" element={<Checkout />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
