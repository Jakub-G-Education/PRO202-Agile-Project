import { useContext, useState } from "react";
import { EventsContext } from "../../contexts/EventsContext";
import EventsService from "../../services/EventsService";
import DatePicker from "../shared/DatePicker";
import styles from "./AddSocial.module.css";
import { Link } from "react-router-dom";
import Modal from 'react-modal';

const AddSocial = () => {
  const { newSocial, getEventsFromService } = useContext(EventsContext);

  const [socialToAdd, setSocialToAdd] = useState({
    title: "",
    content: "",
    place: "",
    time: "",
  });

  const [selected, setSelected] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleChange = (e) => {
    setSocialToAdd({
      ...socialToAdd,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const saveSocial = async () => {
    if (!socialToAdd.title || !socialToAdd.content) {
      alert("Tittel og innhold må være fylt ut. Ikke lagt til.");
      return;
    }

    const newSocial = {
      title: socialToAdd.title,
      content: socialToAdd.content,
      date: selected ? selected.toISOString() : null,
      time: socialToAdd.time,
      place: socialToAdd.place,
    };

    const result = await EventsService.postEvent(newSocial);
    console.log(result);
    if (result === true) {
      await getEventsFromService();
      setIsSaveModalOpen(true);
      setSocialToAdd({
        title: "",
        content: "",
        place: "",
        time: "",
      });
      setSelected(null);
    } else {
      alert("Mislykket");
    }
  };

  return (
    <section className="component-container">
      <div className={styles["inputs-container"]}>
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Tittel</label>
          <input
            className={styles["title"]}
            name="title"
            placeholder="Legg til tittel..."
            onChange={handleChange}
            value={socialToAdd.title}
            type="text"
          />
        </div>
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Sted</label>
          <input
            className={styles["title"]}
            name="place"
            placeholder="Skriv hvor..."
            onChange={handleChange}
            value={socialToAdd.place}
            type="text"
          />
        </div>
        <div className={styles["content-container"]}>
          <label className={styles["input-label"]}>Innhold</label>
          <textarea
            className={styles["content"]}
            name="content"
            placeholder="Skriv her..."
            onChange={handleChange}
            value={socialToAdd.content}
          />
        </div>

      </div>
      <div>
        <label>Kalender</label>
        <DatePicker selected={selected} setSelected={setSelected} />
        <div>
          <label>Start-tid</label>
          <input
            className={styles["title"]}
            name="time"
            onChange={handleChange}
            value={socialToAdd.time}
            type="time"
          />
        </div>
      </div>
      <div className={styles["buttons-container"]}>
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
        <div className={styles["add-buttons-container"]}>
          <input
            className="button"
            onClick={saveSocial}
            type="button"
            value="Publiser"
          />
        </div>
      </div>

      <Modal
          className={styles["modal"]}
          isOpen={isSaveModalOpen}
          onRequestClose={() => setIsSaveModalOpen(false)}
          contentLabel="Bekreftet publisering"
        >
          <h6>Publisering vellykket!</h6>
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

export default AddSocial;
