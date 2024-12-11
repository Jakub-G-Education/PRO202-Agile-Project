import axios from "axios";

const InfosService = (() => {
  const infosController = "http://localhost:5093/infos";

  const getAll = async () => {
    try {
      const result = await axios.get(infosController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${infosController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const putInfo = async (infoToUpdate) => {
    try {
      const result = await axios.put(infosController, infoToUpdate);
      return result;
    } catch (error) {
      return false;
    }
  };

  const postInfo = async (newInfo) => {
    try {
      const result = await axios.post(infosController, newInfo);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteInfo = async (id) => {
    try {
      const result = await axios.delete(`${infosController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postInfo,
    putInfo,
    deleteInfo,
  };
})();

export default InfosService;
