import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVisible } from "../../features/cart/drawerSlice";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this line
  const drawerVisible = useSelector((state) => state.drawerInfo);
  const cart = useSelector((state) => state.cartInfo);

  const handleClose = () => {
    dispatch(setVisible(false));
  };

  const handleGoToCart = () => {
    navigate("/cart"); // Navigate to the cart page
    handleClose(); // Close the drawer
  };

  return (
    <Drawer
      title={`Cart / ${cart.length} Product${cart.length !== 1 ? "s" : ""}`}
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={drawerVisible}
    >
      {cart.length > 0 ? (
        cart.map((p) => (
          <div key={p._id} className="flex items-center mb-4">
            <img
              src={p.images[0]?.url || "/fallback-image.jpg"}
              alt={p.title}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <div>
              <p>{p.title}</p>
              <p>Quantity: {p.count}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <Button
        onClick={handleGoToCart}
        type="primary"
        style={{ marginTop: "10px", marginRight: "10px" }}
      >
        Go to Cart
      </Button>
      <Button
        onClick={handleClose}
        type="primary"
        style={{ marginTop: "10px" }}
      >
        Close
      </Button>
    </Drawer>
  );
};

export default SideDrawer;
