import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoryAction } from "../../features/categories/catAction";
import { Button, Card, Row, Col } from "react-bootstrap";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cats } = useSelector((state) => state.catInfo);

  React.useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  const activeCats = cats.filter((cat) => cat.status === "active");

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Shop By Categories</h1>

      <Row className="justify-content-center">
        {activeCats.map(({ _id, title }) => (
          <Col
            key={_id}
            md={4}
            lg={3}
            className="mb-4 d-flex justify-content-center"
          >
            <Card className="w-100 border-0">
              <Card.Body>
                <Button
                  variant="outline-info"
                  onClick={() => handleCategoryClick(_id)}
                  className="w-100 text-start"
                >
                  {title}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryList;
