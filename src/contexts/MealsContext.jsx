import { createContext, useState, useEffect } from "react";
import MealsService from "../services/MealsService";

export const MealsContext = createContext(null);

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMealsFromService();
  }, []);

  const getMealsFromService = async () => {
    const MealsFromService = await MealsService.getAll();
    setMeals(MealsFromService);
  };

  const getById = async (id) => {
    const mealToUpdate = await MealsService.getById(id);
    return mealToUpdate;
  };

  const editMeal = async (mealToUpdate) => {
    try {
      const result = await MealsService.putMeal(mealToUpdate);

      console.log("Edit meal result:", result);
      if (result && result.updatedID) {
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal.id === result.updatedID ? mealToUpdate : meal
          )
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error in editMeal:", error);
      return false;
    }
  };

  const deleteMeal = async (id) => {
    const result = await MealsService.deleteMeal(id);
    return result;
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        getMealsFromService,
        getById,
        editMeal,
        deleteMeal,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};