import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../assets/images/a.png";
import ProductListItems from "./ProductListItems";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  // Provide default values to avoid destructuring errors
  const {
    title = "Product Title",
    images = [],
    description = "No description available",
  } = product || {};

  return (
    <>
      <div className="col-md-7">
        {images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((i) => (
              <div key={i.public_id}>
                <img
                  src={i.url}
                  alt={i.public_id}
                  style={{ height: "400px", objectFit: "cover", width: "100%" }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={Laptop}
                alt="Default"
                style={{ height: "400px", objectFit: "cover", width: "100%" }}
              />
            }
          />
        )}

        <Tabs type="card" className="mt-3">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us at 123-456-7890 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <a href="#" key="cart">
              <ShoppingCartOutlined className="text-success" /> <br /> Add to
              Cart
            </a>,
            <Link to="/" key="wishlist">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
