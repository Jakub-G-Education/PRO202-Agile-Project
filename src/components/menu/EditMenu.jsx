import React, { useState, useEffect, useContext } from "react";
import { MealsContext } from "../../contexts/MealsContext";
import "./EditMenu.css";
import { Link } from "react-router-dom";

const EditMenu = () => {
  const { meals, getMealsFromService, editMeal } = useContext(MealsContext);
  const [menu, setMenu] = useState({
    Mandag: { meal: "" },
    Tirsdag: { meal: "" },
    Onsdag: { meal: "" },
    Torsdag: { meal: "" },
    Fredag: { meal: "" },
  });

  useEffect(() => {
    const fetchMenu = async () => {
      await getMealsFromService();
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    if (Array.isArray(meals) && meals.length > 0) {
      const currentMenu = meals.reduce((acc, meal) => {
        acc[meal.day] = { meal: meal.meal };
        return acc;
      }, {});
      setMenu(currentMenu);
    }
  }, [meals]);

  const handleChange = (day, e) => {
    const { value } = e.target;

    setMenu((prevMenu) => ({
      ...prevMenu,
      [day]: { meal: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit", e);
    console.log("menu", menu);

    for (const [day, { meal }] of Object.entries(menu)) {
      if (meal !== "") {
        console.log("Updating meal for day:", day, "with new value:", meal);
        try {
          await editMeal({
            day: day,
            food: meal,
          });
        } catch (error) {
          console.error("Error updating meal for day:", day, "Error:", error);
        }
      }
    }
  };

  const handleClear = async () => {
    const clearedMenu = {
      Mandag: { meal: "" },
      Tirsdag: { meal: "" },
      Onsdag: { meal: "" },
      Torsdag: { meal: "" },
      Fredag: { meal: "" },
    };
    setMenu(clearedMenu);

    for (const day in clearedMenu) {
      const mealToUpdate = meals.find((food) => food.day === day);
      if (mealToUpdate) {
        await editMeal({ ...mealToUpdate, food: "" });
      }
    }
  };

  return (
    <section className="component-container">
      <div className="edit-menu">
        <form onSubmit={handleSubmit}>
          {" "}
                    
          <div className="days">
            {Object.keys(menu).map((day) => (
              <div key={day} className="day">
                 <label>{day}</label>               
                <input
                  type="text"
                  name="meal"
                  value={menu[day].meal}
                  onChange={(e) => handleChange(day, e)}
                />
                         
              </div>
            ))}
                
          </div>
             
        </form>
              
      </div>
            
      <div className="button-container">
                
        <div className="back-button-container">
                    
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
                
        <div className="add-button-container">
                    
          <input
            className="alt-button"
            onClick={handleClear}
            type="button"
            value="Tøm"
          />
                    
          <input
            className="button"
            onClick={handleSubmit}
            type="button"
            value="Oppdater"
          />
                  
        </div>
              
      </div>
          
    </section>
  );
};

export default EditMenu;
