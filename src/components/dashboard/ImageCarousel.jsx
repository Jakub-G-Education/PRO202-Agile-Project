import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { PhotosContext } from "../../contexts/PhotosContext";
import PhotosService from "../../services/PhotosService";
import styles from "../../pages/DashboardPage.module.css";
import React from "react";

const ImageCarousel = () => {
  const { photos } = useContext(PhotosContext);
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <Carousel interval={8000} controls={false}>
      {photos.map((_photos, i) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${PhotosService.getImageUrl()}${_photos.image}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
