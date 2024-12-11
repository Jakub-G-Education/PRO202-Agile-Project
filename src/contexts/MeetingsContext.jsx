import { createContext, useState, useEffect } from "react";
import MeetingsService from "../services/MeetingsService";

export const MeetingsContext = createContext(null);

export const MeetingsProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getMeetingsFromService();
  }, []);

  const getMeetingsFromService = async () => {
    const meetingsFromService = await MeetingsService.getAll();
    setMeetings(meetingsFromService);
  };

  const getById = async (id) => {
    const meetingToUpdate = await MeetingsService.getById(id);
    return meetingToUpdate;
  };

  const editMeeting = async (meetingToUpdate) => {
    await MeetingsService.putMeeting(meetingToUpdate);
    getMeetingsFromService();
  };

  const deleteMeeting = async (id) => {
    const result = await MeetingsService.deleteMeeting(id);
    return result;
  };

  return (
    <MeetingsContext.Provider
      value={{
        meetings,
        getMeetingsFromService,
        getById,
        editMeeting,
        deleteMeeting,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
