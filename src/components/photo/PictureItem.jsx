import { useContext, useEffect } from "react";
import { PhotosContext } from "../../contexts/PhotosContext";
import PhotosService from "../../services/PhotosService";

import styles from "../social/AddSocial.module.css";

const PictureItem = () => {
  const { photos, deletePhoto, getPhotosFromService } =
    useContext(PhotosContext);

  const handleDeletePhoto = async (id) => {
    const result = await deletePhoto(id);
    console.log(result);
    if (result === true) {
      await getPhotosFromService();
    }
  };

  const getPhotosJSX = () => {
    if (!photos || photos.length === 0) {
      return null;
    }

    const photosJSX = photos.map((_photos, i) => (
      <div className={styles["picture-container"]} key={_photos.id}>
        <div>
          <img
            src={`${PhotosService.getImageUrl()}${_photos.image}`}
            width={200}
          />
        </div>
        <input
          className="alt-button"
          onClick={() => handleDeletePhoto(_photos.id)}
          type="button"
          value="Slett"
        />
      </div>
    ));
    return photosJSX;
  };

  return getPhotosJSX();
};

export default PictureItem;
