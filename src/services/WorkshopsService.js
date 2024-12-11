import axios from "axios";

const WorkshopsService = (() => {
  const workshopsController = "http://localhost:5093/workshops";
  const imageUrl = "http://localhost:5093/images/";

  const getAll = async () => {
    try {
      const result = await axios.get(workshopsController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${workshopsController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const putWorkshop = async (workshopToUpdate) => {
    try {
      const result = await axios.put(workshopsController, workshopToUpdate);
      return result;
    } catch (error) {
      return false;
    }
  };

  const postWorkshop = async (newWorkshop) => {
    try {
      const result = await axios.post(workshopsController, newWorkshop);
      if (result.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to post workshop:", error);
      return false;
    }
  };

  const getImageUrl = () => {
    return imageUrl;
  };

  const deleteWorkshop = async (id) => {
    try {
      const result = await axios.delete(`${workshopsController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postWorkshop,
    putWorkshop,
    getImageUrl,
    deleteWorkshop,
  };
})();

export default WorkshopsService;
