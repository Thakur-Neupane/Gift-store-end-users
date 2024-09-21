import React, { useState } from "react";
import { Modal, Button, Form, Input, Typography } from "antd";
import { toast } from "react-toastify";
import StarRating from "react-star-ratings";
import { useDispatch } from "react-redux";
import { addNewReviewAction } from "../../features/reviews/reviewAction";

const { Text } = Typography;

const RatingModal = ({
  productName,
  productId,
  visible,
  onClose,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Please provide both a title and a description.");
      return;
    }

    const reviewData = {
      productName,
      productId,
      rating,
      description,
      title,
    };

    try {
      await onSubmit(reviewData);
      toast.success("Thanks for your review. It will appear soon.");
    } catch (error) {
      toast.error(
        "There was an error submitting your review. Please try again."
      );
    }
  };

  return (
    <Modal
      title="Leave Your Rating"
      centered
      visible={visible}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <Form layout="vertical">
        <Form.Item label="Review Title">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of your review"
          />
        </Form.Item>
        <Form.Item label="Rate the Product">
          <div className="text-center mb-3">
            <StarRating
              rating={rating}
              starRatedColor="red"
              starEmptyColor="gray"
              starDimension="40px"
              starSpacing="8px"
              changeRating={handleRatingChange}
              isSelectable={true}
            />
          </div>
        </Form.Item>
        <Form.Item label="Your Rating Description">
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a comment or feedback about the product"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RatingModal;
