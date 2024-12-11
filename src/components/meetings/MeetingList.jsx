import { useContext, useEffect } from "react";
import { MeetingsContext } from "../../contexts/MeetingsContext";

const MeetingList = () => {
  const { meetings } = useContext(MeetingsContext);

  const getMeetingsJSX = () => {
    if (!meetings || meetings.length === 0) {
      return null;
    }

    const meetingsJSX = meetings.map((_meetings, i) => (
      <option key={i} value={_meetings.id}>
        {_meetings.title}
      </option>
    ));
    return meetingsJSX;
  };

  return getMeetingsJSX();
};

export default MeetingList;
