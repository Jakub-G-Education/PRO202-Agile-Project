import axios from "axios";

const EventsService = (() => {
  const eventsController = "http://localhost:5093/events";

  const getAll = async () => {
    try {
      const result = await axios.get(eventsController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${eventsController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const putEvent = async (eventToUpdate) => {
    try {
      const result = await axios.put(eventsController, eventToUpdate);
      return result;
    } catch (error) {
      return false;
    }
  };

  const postEvent = async (newEvent) => {
    try {
      const result = await axios.post(eventsController, newEvent);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getImageUrl = () => {
    return imageUrl;
  };

  const deleteEvent = async (id) => {
    try {
      const result = await axios.delete(`${eventsController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postEvent,
    putEvent,
    getImageUrl,
    deleteEvent,
  };
})();

export default EventsService;
