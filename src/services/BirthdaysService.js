import axios from "axios";

const BirthdaysService = (() => {
  const birthdaysController = "http://localhost:5093/birthdays";
  const imageUploadController =
    "http://localhost:5093/api/imageupload/saveimage";
  const imageUrl = "http://localhost:5055/images/";

  const getAll = async () => {
    try {
      const result = await axios.get(birthdaysController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${birthdaysController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const putBirthday = async (birthdayToUpdate) => {
    try {
      const result = await axios.put(birthdaysController, birthdayToUpdate);
      return result;
    } catch (error) {
      return false;
    }
  };

  const postBirthday = async (newBirthday) => {
    try {
      const result = await axios.post(birthdaysController, newBirthday);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getImageUrl = () => {
    return imageUrl;
  };

  const deleteBirthday = async (id) => {
    try {
      const result = await axios.delete(`${birthdaysController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postBirthday,
    putBirthday,
    getImageUrl,
    deleteBirthday,
  };
})();

export default BirthdaysService;
