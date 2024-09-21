// pages/Landing.js
import React from "react";
import { Container } from "react-bootstrap";
import CarouselComponent from "../../components/common/CarouselComponent";
import NewArrivals from "../../components/home/NewArrivals";
import BestSellers from "../../components/home/BestSellers";
import CategoryList from "../category/CategoryList";
// import HighestRatedProducts from "../products/HighestRatedProduct";
import HighestDiscountedProducts from "../products/HighestDiscountedProduct";

const Landing = () => {
  return (
    <>
      {/* <CarouselComponent /> */}
      <Container className="mt-5">
        <NewArrivals />
        <BestSellers />
        <HighestDiscountedProducts />
        {/* <HighestRatedProducts /> */}
        <CategoryList />
      </Container>
    </>
  );
};

export default Landing;
