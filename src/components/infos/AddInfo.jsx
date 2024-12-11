import { useContext, useState } from "react";
import { InfosContext } from "../../contexts/InfosContext";
import InfosService from "../../services/InfosService";
import styles from "../social/AddSocial.module.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const AddInfo = () => {
  const [infoToAdd, setInfoToAdd] = useState({});
  const [addStatus, setAddStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleChange = (e) => {
    switch (e.currentTarget.name) {
      case "content":
        setInfoToAdd({ ...infoToAdd, content: e.currentTarget.value });
        break;
    }
  };

  const saveInfo = async () => {
    if (!infoToAdd.content) {
      alert("Mangler innhold.");
      return;
    }

    const newInfo = {
      content: infoToAdd.content,
    };

    const result = await InfosService.postInfo(newInfo);
    console.log(result);
    if (result === true) {
      setIsSaveModalOpen(true);
      setInfoToAdd({
        content: "",
      });
    } else {
      alert("Mislykket");
    }
  };

  return (
    <section className="component-container">
      <div className={styles["inputs-container"]}>
        <div className={styles["content-container"]}>
          <label className={styles["input-label"]}>Innhold</label>
          <textarea
            className={styles["content"]}
            name="content"
            placeholder="Skriv her..."
            onChange={handleChange}
            value={infoToAdd.content}
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
            onClick={saveInfo}
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
        <Link
          className={`${styles["confirm-buttons"]} ${styles["modal-button"]}`}
          to="/dashboard"
        >
          Gå til Dashboard
        </Link>
      </Modal>
    </section>
  );
};

export default AddInfo;
