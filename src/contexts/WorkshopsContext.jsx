import { createContext, useState, useEffect } from "react";
import WorkshopsService from "../services/WorkshopsService";

export const WorkshopsContext = createContext(null);

export const WorkshopsProvider = ({ children }) => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    getWorkshopsFromService();
  }, []);

  const getWorkshopsFromService = async () => {
    const workshopsFromService = await WorkshopsService.getAll();
    setWorkshops(workshopsFromService);
  };

  const getById = async (id) => {
    const workshopToUpdate = await WorkshopsService.getById(id);
    return workshopToUpdate;
  };

  const editWorkshop = async (workshopToUpdate) => {
    await WorkshopsService.putWorkshop(workshopToUpdate);
    getWorkshopsFromService();
  };

  const deleteWorkshop = async (id) => {
    const result = await WorkshopsService.deleteWorkshop(id);
    return result;
  };

  return (
    <WorkshopsContext.Provider
      value={{
        workshops,
        getWorkshopsFromService,
        getById,
        editWorkshop,
        deleteWorkshop,
      }}
    >
      {children}
    </WorkshopsContext.Provider>
  );
};
