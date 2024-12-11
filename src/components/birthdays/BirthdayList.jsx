import { useContext, useEffect } from "react";
import { BirthdaysContext } from "../../contexts/BirthdaysContext";

const BirthdayList = () => {
  const { birthdays } = useContext(BirthdaysContext);

  const getBirthdaysJSX = () => {
    if (!birthdays || birthdays.length === 0) {
      return null;
    }

    const birthdaysJSX = birthdays.map((_birthdays, i) => (
      <option key={i} value={_birthdays.id}>
        {_birthdays.name}
      </option>
    ));
    return birthdaysJSX;
  };

  return getBirthdaysJSX();
};

export default BirthdayList;
