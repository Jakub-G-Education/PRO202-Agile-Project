import { useState } from "react";
import WorkshopList from "./WorkshopList";
import "../../pages/AdminPage.css";
import styles from "../social/AddSocial.module.css";
import EditWorkshopTemplate from "./EditWorkshopTemplate";

const EditWorkshop = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  const handleSelectChange = (e) => {
    setSelectedWorkshop(e.target.value);
  };

  return (
    <section className={styles["column"]}>
      <div className={styles["dropdown-container"]}>
        <label htmlFor="select-template">Rediger workshop</label>
        <select
          id="select-template"
          onChange={handleSelectChange}
          value={selectedWorkshop}
        >
          <option value="" disabled>
            Finn workshop...
          </option>
          <WorkshopList />
        </select>
      </div>
      {selectedWorkshop && (
        <EditWorkshopTemplate
          selectedWorkshopId={selectedWorkshop}
          setSelectedWorkshopId={setSelectedWorkshop}
        />
      )}
    </section>
  );
};

export default EditWorkshop;
