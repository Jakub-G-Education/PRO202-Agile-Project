import { useState } from "react";
import BirthdayList from "./BirthdayList";
import "../../pages/AdminPage.css";
import EditBirthdayTemplate from "./EditBirthdayTemplate";
import styles from "../social/AddSocial.module.css";

const EditBirthday = () => {
  const [selectedBirthday, setSelectedBirthday] = useState("");

  const handleSelectChange = (e) => {
    setSelectedBirthday(e.target.value);
  };

  return (
    <section className={styles["column"]}>
      <div className={styles["dropdown-container"]}>
        <label htmlFor="select-template">Rediger bursdag</label>
        <select
          id="select-template"
          onChange={handleSelectChange}
          value={selectedBirthday}
        >
          <option value="" disabled>
            Finn bursdag...
          </option>
          <BirthdayList />
        </select>
      </div>
      {selectedBirthday && (
        <EditBirthdayTemplate
          selectedBirthdayId={selectedBirthday}
          setSelectedBirthdayId={setSelectedBirthday}
        />
      )}
    </section>
  );
};

export default EditBirthday;
