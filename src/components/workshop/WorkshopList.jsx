import { useContext } from "react";
import { WorkshopsContext } from "../../contexts/WorkshopsContext";

const WorkshopList = () => {
  const { workshops } = useContext(WorkshopsContext);

  const getWorkshopsJSX = () => {
    if (!workshops || workshops.length === 0) {
      return null;
    }

    const workshopsJSX = workshops.map((_workshops, i) => (
      <option key={i} value={_workshops.id}>
        {_workshops.title}
      </option>
    ));
    return workshopsJSX;
  };

  return getWorkshopsJSX();
};

export default WorkshopList;
