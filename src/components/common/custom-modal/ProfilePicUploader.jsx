import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const IMAGE_WIDTH = 720;
const IMAGE_HEIGHT = 720;
const IMAGE_QUALITY = 80;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ProfilePicUploader = ({ onUpload, buttonText }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector((state) => state.userInfo.token);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        "JPEG",
        IMAGE_QUALITY,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image to upload.");
      return;
    }

    if (selectedImage.size > MAX_SIZE_BYTES) {
      setError(`File size should not exceed ${MAX_SIZE_MB} MB.`);
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Resize the image
      const base64Image = await resizeImage(selectedImage);

      // Convert base64 image to Blob
      const response = await fetch(base64Image);
      const blob = await response.blob();
      const file = new File([blob], selectedImage.name, { type: "image/jpeg" });

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Upload the image to your backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_SERVR_ROOT}api/v1/cloudinary/uploadimages`, // Replace with your backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token if needed for authentication
          },
        }
      );

      // Pass the uploaded image URL to the parent component
      onUpload(data.secure_url);

      handleClose();
    } catch (uploadError) {
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <>
      <Button variant="outline-secondary" className="mt-2" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {error && <p className="text-danger mt-2">{error}</p>}
            {loading && (
              <Spinner
                animation="border"
                role="status"
                style={{ width: "24px", height: "24px" }}
              >
                <span className="visually-hidden">Uploading...</span>
              </Spinner>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleImageUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfilePicUploader;
