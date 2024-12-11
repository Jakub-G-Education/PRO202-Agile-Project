import axios from "axios";

const PhotosService = (() => {
  const photosController = "http://localhost:5093/photos";
  const imageUploadController =
    "http://localhost:5093/api/imageupload/saveimage";
  const imageUrl = "http://localhost:5093/images/";

  const getAll = async () => {
    try {
      const result = await axios.get(photosController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${photosController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const postPhoto = async (newPhoto, image) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const result = await axios.post(photosController, newPhoto);

      const resultImageUpload = await axios({
        url: imageUploadController,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      formData.delete("file");
      return true;
    } catch (error) {
      return false;
    }
  };

  const getImageUrl = () => {
    return imageUrl;
  };

  const deletePhoto = async (id) => {
    try {
      const result = await axios.delete(`${photosController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postPhoto,
    getImageUrl,
    deletePhoto,
  };
})();

export default PhotosService;
