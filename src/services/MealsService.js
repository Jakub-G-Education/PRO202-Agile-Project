import axios from "axios";

const MealsService = (() => {
  const mealsController = "http://localhost:5093/meals";

  const getAll = async () => {
    try {
      const result = await axios.get(mealsController);
      return result.data;
    } catch (error) {
      console.error("Error fetching meals:", error);
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${mealsController}/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error fetching meal by ID:", error);
      return false;
    }
  };

  const putMeal = async (mealToUpdate) => {
    try {
      console.log("Sending update request for meal:", mealToUpdate);
      const result = await axios.put(mealsController, mealToUpdate);
      if (result.status === 204) {

        console.log("Update successful, no content returned.");
        return mealToUpdate;
      }
      console.log("Update successful:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error updating meal:", error);
      return false;
    }
  };

  const postMeal = async (newMeal, image) => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const result = await axios.post(mealsController, newMeal);

      const resultImageUpload = await axios({
        url: "http://localhost:5093/api/imageupload/saveimage",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      formData.delete("file");
      return true;
    } catch (error) {
      console.error("Error posting meal:", error);
      return false;
    }
  };

  const deleteMeal = async (id) => {
    try {
      await axios.delete(`${mealsController}/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting meal:", error);
      return false;
    }
  };

  return {
    getAll,
    getById,
    postMeal,
    putMeal,
    deleteMeal,
  };
})();

export default MealsService;