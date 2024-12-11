import { useState } from "react";
import "./AdminPage.css";
import styles from "./ManagePage.module.css";
import EditMeeting from "../components/meetings/EditMeeting";
import EditSocial from "../components/social/EditSocial";
import EditMenu from "../components/menu/EditMenu";
import EditBirthday from "../components/birthdays/EditBirthday";
import EditWorkshop from "../components/workshop/EditWorkshop";
import EditPicture from "../components/photo/EditPicture";
import EditInfo from "../components/infos/EditInfo";
import { Link } from "react-router-dom";

const ManagePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const changeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChange = () => {
    switch (selectedCategory) {
      case "meetings":
        return <EditMeeting />;
      case "social":
        return <EditSocial />;
      case "menu":
        return <EditMenu />;
      case "birthday":
        return <EditBirthday />;
      case "workshops":
        return <EditWorkshop />;
      case "pictures":
        return <EditPicture />;
      case "info":
        return <EditInfo />;
    }
  };

  return (
    <section className={`${styles["main-container"]}`}>
      <div className="side-bar"></div>
      <div className="content-container">
        <Link to="/" className="logo-container">
          <img className="logo" src="images/kpmg.png" alt="KPMG logo." />
        </Link>
        <div className="dropdown-container">
          <label>Hent innhold</label>
          <select id="select-template" onChange={changeSelectedCategory}>
            <option disabled selected>
              Hent innhold
            </option>
            <option value="meetings">Møter</option>
            <option value="social">Sosialt</option>
            <option value="menu">Ukesmeny</option>
            <option value="birthday">Bursdag</option>
            <option value="workshops">Workshop</option>
            <option value="pictures">Bilder</option>
            <option value="info">Viktig informasjon</option>
          </select>
        </div>
        {handleChange()}
      </div>
    </section>
  );
};

export default ManagePage;
