import { createContext, useState, useEffect } from "react";
import PhotosService from "../services/PhotosService";

export const PhotosContext = createContext(null);

export const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotosFromService();
  }, []);

  const getPhotosFromService = async () => {
    const photosFromService = await PhotosService.getAll();
    setPhotos(photosFromService);
  };

  const getById = async (id) => {
    const photoToUpdate = await PhotosService.getById(id);
    return photoToUpdate;
  };

  const deletePhoto = async (id) => {
    const result = await PhotosService.deletePhoto(id);
    return result;
  };

  return (
    <PhotosContext.Provider
      value={{
        photos,
        getPhotosFromService,
        getById,
        deletePhoto,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
