import { useState } from "react";
import MeetingList from "./MeetingList";
import "../../pages/AdminPage.css";
import EditMeetingTemplate from "./EditMeetingTemplate";
import styles from "../meetings/AddMeeting.module.css";

const EditMeeting = () => {
  const [selectedMeeting, setSelectedMeeting] = useState("");

  const handleSelectChange = (e) => {
    setSelectedMeeting(e.target.value);
  };

  return (
    <section className={styles["column"]}>
      <div className={styles["dropdown-container"]}>
        <label htmlFor="select-template">Rediger møte</label>
        <select
          id="select-template"
          onChange={handleSelectChange}
          value={selectedMeeting}
        >
          <option value="" disabled>
            Finn møte...
          </option>
          <MeetingList />
        </select>
      </div>
      {selectedMeeting && (
        <EditMeetingTemplate
          selectedMeetingId={selectedMeeting}
          setSelectedMeetingId={setSelectedMeeting}
        />
      )}
    </section>
  );
};

export default EditMeeting;
