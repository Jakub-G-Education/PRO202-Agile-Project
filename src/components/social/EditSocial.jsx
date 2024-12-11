import { useState } from "react";
import SocialList from "./SocialList";
import "../../pages/AdminPage.css";
import styles from "../social/AddSocial.module.css";
import EditSocialTemplate from "./EditSocialTemplate";

const EditSocial = () => {
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSelectChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  return (
    <section className={styles["column"]}>
      <div className={styles["dropdown-container"]}>
        <label htmlFor="select-template">Rediger arrangement</label>
        <select
          id="select-template"
          onChange={handleSelectChange}
          value={selectedEvent}
        >
          <option value="" disabled>
            Finn arrangement...
          </option>
          <SocialList />
        </select>
      </div>
      {selectedEvent && (
        <EditSocialTemplate
          selectedEventId={selectedEvent}
          setSelectedEventId={setSelectedEvent}
        />
      )}
    </section>
  );
};

export default EditSocial;
