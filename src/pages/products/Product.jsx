import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import SafeStarRatings from "../../components/SafeStarRating";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneProductAction,
  fetchSimilarProductsAction,
} from "../../features/products/productAction";
import { getCategoryAction } from "../../features/categories/catAction";
import { getSubCategoryAction } from "../../features/subcategories/subCatAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartOutlined } from "@ant-design/icons";
import RatingModal from "../../components/common/RatingModal";
import AverageRating from "../../helpers/AverageRating";
import {
  getReviewsAction,
  addNewReviewAction,
  updateReviewAction,
} from "../../features/reviews/reviewAction";
import RelatedProducts from "./RelatedProducts";
import AddToCart from "../../pages/products/AddToCart"; // Import the AddToCart component

const Product = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [newReview, setNewReview] = useState({
    title: "",
    ratings: 1,
    message: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [userReview, setUserReview] = useState(null);

  const product = useSelector((state) => state.productInfo.product);
  const user = useSelector((state) => state.userInfo.user);
  const categories = useSelector((state) => state.catInfo.cats);
  const subCategories = useSelector((state) => state.subCatInfo.subCats);
  const reviews = useSelector((state) => state.reviewInfo.pubReviews);

  const [subCatMap, setSubCatMap] = useState({});

  useEffect(() => {
    dispatch(getOneProductAction(_id));
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
    dispatch(getReviewsAction(false)); // Fetch public reviews
    dispatch(fetchSimilarProductsAction(_id)); // Fetch similar products
  }, [_id, dispatch]);

  useEffect(() => {
    const map = subCategories.reduce((acc, subCat) => {
      acc[subCat._id] = subCat.title;
      return acc;
    }, {});
    setSubCatMap(map);
  }, [subCategories]);

  useEffect(() => {
    if (user) {
      const existingReview = reviews.find(
        (review) => review.productId === _id && review.userId === user._id
      );
      setUserReview(existingReview);
      if (existingReview) {
        setNewReview({
          title: existingReview.title,
          ratings: existingReview.ratings,
          message: existingReview.message,
        });
      }
    }
  }, [reviews, user, _id]);

  const handleAddOrUpdateReview = async (reviewData) => {
    if (!user) {
      setShowLoginPrompt(true);
      navigate("/signIn", { state: { from: location.pathname } });
      return;
    }

    const completeReviewData = {
      ...reviewData,
      userId: user._id,
      userName: `${user.fName} ${user.lName}`,
      productId: _id,
      productName: product.name,
    };

    try {
      if (userReview) {
        // Update existing review
        await dispatch(
          updateReviewAction({ _id: userReview._id, ...completeReviewData })
        );
      } else {
        // Add new review
        await dispatch(addNewReviewAction(completeReviewData));
      }
      setNewReview({ title: "", ratings: 1, message: "" });
      setShowModal(false); // Close the modal after successful review submission
    } catch (error) {
      console.error("Failed to add/update review:", error);
    }
  };

  const productReviews = reviews.filter((review) => review.productId === _id);

  if (!product) {
    return <Alert variant="info">Product not found</Alert>;
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.title : "N/A";
  };

  const getSubCategoryNames = (subCategoryIds) => {
    const names = subCategoryIds.map((id) => subCatMap[id] || "N/A").join(", ");
    return names || "N/A";
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/category/${categoryId}`);
    } else {
      console.error("Invalid categoryId:", categoryId);
    }
  };

  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/subcategory/${subCategoryId}`);
  };

  const colors = product.colors || [];
  const quantityLeft = product.quantity - product.sold; // Calculate quantity left

  return (
    <Container className="my-4">
      <Row>
        <Col md={7}>
          {product.images && product.images.length > 0 ? (
            <Carousel
              showArrows={true}
              autoPlay
              infiniteLoop
              interval={3000}
              transitionTime={500}
              showStatus={false}
              swipeable
            >
              {product.images.map((img, index) => (
                <div key={img.public_id}>
                  <img
                    src={img.url}
                    alt={`Slide ${index}`}
                    className="carousel-image"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <Card>
              <Card.Img
                src="/path/to/default/image.jpg"
                alt="Default"
                className="carousel-image"
              />
            </Card>
          )}
        </Col>

        <Col md={5}>
          <Card>
            <Card.Header className="bg-info text-white p-3">
              <h1>{product.name}</h1>
            </Card.Header>

            <Card.Body>
              <Card.Text>
                <p>
                  <strong>Price:</strong>{" "}
                  {product.salesPrice ? (
                    <span>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "red",
                        }}
                      >
                        ${product.price}
                      </span>{" "}
                      ${product.salesPrice}
                    </span>
                  ) : (
                    `$${product.price}`
                  )}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleCategoryClick(product.category)}
                  >
                    {getCategoryName(product.category)}
                  </span>
                </p>
                <p>
                  <strong>Subcategories:</strong>{" "}
                  {product.subCategories && product.subCategories.length > 0
                    ? product.subCategories.map((id, index) => (
                        <span key={id}>
                          <span
                            style={{ color: "green", cursor: "pointer" }}
                            onClick={() => handleSubCategoryClick(id)}
                          >
                            {subCatMap[id] || "N/A"}
                          </span>
                          {index < product.subCategories.length - 1 && ", "}
                        </span>
                      ))
                    : "N/A"}
                </p>
                <p>
                  <strong>Color Options:</strong> {product.color}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
                <p>
                  <strong>Quantity Left:</strong> {quantityLeft}
                </p>
                <p>
                  <strong>Average Rating:</strong>{" "}
                  <AverageRating ratings={productReviews} />
                </p>
              </Card.Text>
              <ButtonGroup>
                <AddToCart product={product} />
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => {
                    if (!user) {
                      setShowLoginPrompt(true);
                      navigate("/signIn", {
                        state: { from: location.pathname },
                      });
                    } else {
                      console.log("Add to Wishlist clicked");
                    }
                  }}
                >
                  <HeartOutlined /> Add to Wishlist
                </Button>
                {user ? (
                  <Button
                    variant="warning"
                    className="mx-2"
                    onClick={() => setShowModal(true)}
                  >
                    {userReview ? "Update Your Review" : "Write a Review"}
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    className="mx-2"
                    onClick={() => {
                      setShowLoginPrompt(true);
                      navigate("/signIn", {
                        state: { from: location.pathname },
                      });
                    }}
                  >
                    Login to give review
                  </Button>
                )}
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Customer Reviews</h2>
          {productReviews && productReviews.length > 0 ? (
            productReviews.map((review) => (
              <div key={review._id} className="review mb-4 p-3 border rounded">
                <SafeStarRatings
                  rating={parseFloat(review.rating) || 0}
                  starRatedColor="gold"
                  starEmptyColor="gray"
                  starDimension="20px"
                  starSpacing="5px"
                  isSelectable={false}
                />
                <h4>{review.title}</h4>
                <p>{review.message}</p>
                <p>
                  <strong>By:</strong> {review.userName}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
          {showLoginPrompt && (
            <Alert variant="warning">
              You need to{" "}
              <a
                href="/signIn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signIn", { state: { from: location.pathname } });
                }}
              >
                log in
              </a>{" "}
              to write a review.
            </Alert>
          )}
          {user && (
            <RatingModal
              productId={product._id}
              productName={product.name}
              visible={showModal}
              onClose={() => setShowModal(false)}
              onSubmit={handleAddOrUpdateReview}
              review={userReview}
            />
          )}
        </Col>
      </Row>
      <RelatedProducts /> {/* Integrate RelatedProducts component here */}
    </Container>
  );
};

export default Product;
