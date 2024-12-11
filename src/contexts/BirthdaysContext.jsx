import { createContext, useState, useEffect } from "react";
import BirthdaysService from "../services/BirthdaysService";

export const BirthdaysContext = createContext(null);

export const BirthdaysProvider = ({ children }) => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    getBirthdaysFromService();
  }, []);

  const getBirthdaysFromService = async () => {
    const birthdaysFromService = await BirthdaysService.getAll();
    setBirthdays(birthdaysFromService);
  };

  const getById = async (id) => {
    const birthdayToUpdate = await BirthdaysService.getById(id);
    return birthdayToUpdate;
  };

  const editBirthday = async (birthdayToUpdate) => {
    await BirthdaysService.putBirthday(birthdayToUpdate);
    getBirthdaysFromService();
  };

  const deleteBirthday = async (id) => {
    const result = await BirthdaysService.deleteBirthday(id);
    return result;
  };

  return (
    <BirthdaysContext.Provider
      value={{
        birthdays,
        getBirthdaysFromService,
        getById,
        editBirthday,
        deleteBirthday,
      }}
    >
      {children}
    </BirthdaysContext.Provider>
  );
};
