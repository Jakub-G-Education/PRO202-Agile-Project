import { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { MeetingsContext } from "../../contexts/MeetingsContext";
import { Link } from "react-router-dom";
import DatePicker from "../shared/DatePicker";
import styles from "../meetings/AddMeeting.module.css";

const EditMeetingTemplate = ({ selectedMeetingId, setSelectedMeetingId }) => {
  const { getById, editMeeting, deleteMeeting, getMeetingsFromService } =
    useContext(MeetingsContext);

  const [meetingToUpdate, setMeetingToUpdate] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endTime: "",
  });

  const [selected, setSelected] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    if (selectedMeetingId) {
      getByIdFromContext();
    }
  }, [selectedMeetingId]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setMeetingToUpdate((prevMeeting) => ({
      ...prevMeeting,
      [name]: value,
    }));
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const getByIdFromContext = async () => {
    const meetingFromContext = await getById(selectedMeetingId);
    if (meetingFromContext) {
      const { startDate, ...otherData } = meetingFromContext;
      if (isValidDate(startDate)) {
        setMeetingToUpdate({
          ...otherData,
          startDate: new Date(startDate).toISOString().substring(0, 10),
        });
        setSelected(new Date(startDate));
      }
    }
  };

  const handleDateChange = (date) => {
    if (!isNaN(date)) {
      setSelected(date);
      setMeetingToUpdate((prevMeeting) => ({
        ...prevMeeting,
        startDate: date.toISOString().substring(0, 10),
      }));
    }
  };

  const saveChanges = async () => {
    await editMeeting(meetingToUpdate);
    setIsSaveModalOpen(true); 
  };

  const handleDeleteMeeting = async () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMeeting = async () => {
    const result = await deleteMeeting(selectedMeetingId);
    if (result === true) {
      await getMeetingsFromService();
      setSelected(null);
      setSelectedMeetingId("");
    } else {
      alert("Noe gikk galt, innlegget er ikke slettet!");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <section className="component-container">
      <div className={styles["inputs-container"]}>
        <div className={styles["input-title-container"]}>
          <label className={styles["input-label"]}>Tittel</label>
          <input
            className={styles["title"]}
            onChange={handleChange}
            name="title"
            value={meetingToUpdate.title}
            type="text"
          />
        </div>

        <div className={styles["input-time-container"]}>
          <div>
            <label className={styles["input-label"]}>Start-tid</label>
            <input
              className={styles["title"]}
              name="startTime"
              onChange={handleChange}
              type="time"
              value={meetingToUpdate.startTime}
            />
          </div>
          <div>
            <label className={styles["input-label"]}>Slutt-tid</label>
            <input
              className={styles["title"]}
              name="endTime"
              onChange={handleChange}
              type="time"
              value={meetingToUpdate.endTime}
            />
          </div>
        </div>
      </div>

      <div className={styles["button-container"]}>
        <div className={styles["back-button-container"]}>
          <Link className="alt-button" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9.12505 21.1L0.700049 12.7C0.600049 12.6 0.529382 12.4917 0.488049 12.375C0.446049 12.2584 0.425049 12.1334 0.425049 12C0.425049 11.8667 0.446049 11.7417 0.488049 11.625C0.529382 11.5084 0.600049 11.4 0.700049 11.3L9.12505 2.87502C9.35838 2.64169 9.65005 2.52502 10 2.52502C10.35 2.52502 10.65 2.65002 10.9 2.90002C11.15 3.15002 11.275 3.44169 11.275 3.77502C11.275 4.10836 11.15 4.40002 10.9 4.65002L3.55005 12L10.9 19.35C11.1334 19.5834 11.25 19.8707 11.25 20.212C11.25 20.554 11.125 20.85 10.875 21.1C10.625 21.35 10.3334 21.475 10 21.475C9.66672 21.475 9.37505 21.35 9.12505 21.1Z"
                fill="#084682"
              />
            </svg>{" "}
            Tilbake
          </Link>
        </div>
        <div className={styles["add-button-container"]}>
          <input
            className="alt-button"
            onClick={handleDeleteMeeting}
            type="button"
            value="Slett"
          />
          <input
            className="button"
            onClick={saveChanges}
            type="button"
            value="Oppdater"
            />
          </div>
        </div>
        <div>
          <label>Kalender</label>
          <DatePicker selected={selected} setSelected={handleDateChange} />
        </div>
  
        <Modal className={styles["modal"]}
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          contentLabel="Bekreft sletting"
        >
          <h6>Er du sikker på at du ønsker å slette innholdet? Handlingen kan ikke angres!</h6>
          <button 
            className={`${styles["back-buttons"]} ${styles["modal-button"]}`} 
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Avbryt
          </button>
          <button 
          className={`${styles["confirm-buttons"]} ${styles["modal-button"]}`} 
          onClick={confirmDeleteMeeting}
          >Slett</button>
        </Modal>
  
        <Modal
          className={styles["modal"]}
          isOpen={isSaveModalOpen}
          onRequestClose={() => setIsSaveModalOpen(false)}
          contentLabel="Bekreftet oppdatering"
        >
          <h6>Oppdatering vellykket!</h6>
          <button
            className={`${styles["back-buttons"]} ${styles["modal-button"]}`}
            onClick={() => setIsSaveModalOpen(false)}
          >
            Tilbake
          </button>
          <Link className={`${styles["confirm-buttons"]} ${styles["modal-button"]}`} to="/dashboard">
            Gå til Dashboard
          </Link>
      </Modal>
      </section>
    );
  };
  
  export default EditMeetingTemplate;
  

