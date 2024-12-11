import { useState } from "react";

import { Link } from "react-router-dom";
import "./AdminPage.css";
import AddSocial from "../components/social/AddSocial";

import AddPicture from "../components/photo/AddPicture";

import AddMeeting from "../components/meetings/AddMeeting";
import AddWorkshop from "../components/workshop/AddWorkshop";
import AddBirthday from "../components/birthdays/AddBirthday";
import AddInfo from "../components/infos/AddInfo";

const AddPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const changeSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChange = () => {
    switch (selectedCategory) {
      case "social":
        return <AddSocial />;
      case "meetings":
        return <AddMeeting />;
      case "workshops":
        return <AddWorkshop />;
      case "pictures":
        return <AddPicture />;
      case "birthdays":
        return <AddBirthday />;
      case "infos":
        return <AddInfo />;
    }
  };

  return (
    <section className="main-container">
      <div className="side-bar"></div>
      <div className="content-container">
        <Link to="/" className="logo-container">
          <img className="logo" src="images/kpmg.png" alt="KPMG logo." />
        </Link>
        <div className="dropdown-container">
          <label htmlFor="select-template">Velg en mal </label>
          <select id="select-template" onChange={changeSelectedCategory}>
            <option disabled selected>
              Velg en mal
            </option>
            <option value="social">Sosialt</option>
            <option value="meetings">Møter</option>
            <option value="workshops">Workshop</option>
            <option value="pictures">Bilder</option>
            <option value="birthdays">Bursdag</option>
            <option value="infos">Viktig Informasjon</option>
          </select>
        </div>
        {handleChange()}
      </div>
    </section>
  );
};

export default AddPage;
