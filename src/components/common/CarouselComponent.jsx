import React from "react";
import a from "../../assets/images/a.png";
import b from "../../assets/images/b.png";
import c from "../../assets/images/c.png";
import { Container, Button, Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <Container className="px-0 mt-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={a}
            alt="Smart Watches"
          />
          <Carousel.Caption className="carousel-caption">
            <h6 className="text-uppercase text-black fw-bolder">
              Explore the new range
            </h6>
            <h1 className="display-4 text-black fw-bolder">
              Million products
              <br />
              in our store!
            </h1>
            <Button variant="dark" className="mt-3">
              DISCOVER NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={b} alt="Laptops" />
          <Carousel.Caption className="carousel-caption">
            <h6 className="text-uppercase text-black fw-bolder">
              Unbeatable Prices
            </h6>
            <h1 className="display-4 text-black fw-bolder">
              Top Quality Laptops
              <br />
              Just For You!
            </h1>
            <Button variant="dark" className="mt-3">
              SHOP NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={c}
            alt="Headphones"
          />
          <Carousel.Caption className="carousel-caption">
            <h6 className="text-uppercase text-black fw-bolder">
              Crystal Clear Sound
            </h6>
            <h1 className="display-4 text-black fw-bolder">
              Experience Music
              <br />
              Like Never Before
            </h1>
            <Button variant="dark" className="mt-3">
              BUY NOW
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselComponent;
