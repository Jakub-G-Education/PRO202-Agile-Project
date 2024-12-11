import { useState, useContext, useEffect } from "react";
import { InfosContext } from "../../contexts/InfosContext";
import EditInfoTemplate from "./EditInfoTemplate";
import "../../pages/AdminPage.css";
import styles from "../meetings/AddMeeting.module.css";

const EditInfo = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const { infos, getInfosFromService } = useContext(InfosContext);

  useEffect(() => {
    const fetchInfos = async () => {
      await getInfosFromService();
    };
    fetchInfos();
  }, []);

  useEffect(() => {
    if (infos && infos.length > 0) {
      setSelectedInfo(infos[0].id); 
    }
  }, [infos]);

  return (
    <section className={styles["column"]}>
      {selectedInfo && (
        <EditInfoTemplate
          selectedInfoId={selectedInfo}
          setSelectedInfoId={setSelectedInfo}
        />
      )}
    </section>
  );
};

export default EditInfo;
