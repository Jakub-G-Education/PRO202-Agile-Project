import { createContext, useState, useEffect } from "react";
import InfosService from "../services/InfosService";

export const InfosContext = createContext(null);

export const InfosProvider = ({ children }) => {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    getInfosFromService();
  }, []);

  const getInfosFromService = async () => {
    const InfosFromService = await InfosService.getAll();
    setInfos(InfosFromService);
  };

  const getById = async (id) => {
    const infoToUpdate = await InfosService.getById(id);
    return infoToUpdate;
  };

  const editInfo = async (infoToUpdate) => {
    await InfosService.putInfo(infoToUpdate);
    getInfosFromService();
  };

  const deleteInfo = async (id) => {
    const result = await InfosService.deleteInfo(id);
    return result;
  };

  return (
    <InfosContext.Provider
      value={{
        infos,
        getInfosFromService,
        getById,
        editInfo,
        deleteInfo,
      }}
    >
      {children}
    </InfosContext.Provider>
  );
};
