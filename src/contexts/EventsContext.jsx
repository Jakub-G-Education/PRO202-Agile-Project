import { createContext, useState, useEffect } from "react";
import EventsService from "../services/EventsService";

export const EventsContext = createContext(null);

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsFromService();
  }, []);

  const getEventsFromService = async () => {
    const EventsFromService = await EventsService.getAll();
    setEvents(EventsFromService);
  };

  const getById = async (id) => {
    const eventToUpdate = await EventsService.getById(id);
    return eventToUpdate;
  };

  const editEvent = async (eventToUpdate) => {
    await EventsService.putEvent(eventToUpdate);
    getEventsFromService();
  };

  const deleteEvent = async (id) => {
    const result = await EventsService.deleteEvent(id);
    return result;
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        getEventsFromService,
        getById,
        editEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
