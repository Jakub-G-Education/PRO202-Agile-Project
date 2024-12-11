import axios from "axios";

const MeetingsService = (() => {
  const meetingsController = "http://localhost:5093/meetings";
  const imageUploadController =
    "http://localhost:5093/api/imageupload/saveimage";
  const imageUrl = "http://localhost:5093/images/";

  const getAll = async () => {
    try {
      const result = await axios.get(meetingsController);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const getById = async (id) => {
    try {
      const result = await axios.get(`${meetingsController}/${id}`);
      return result.data;
    } catch (error) {
      return false;
    }
  };

  const putMeeting = async (meetingToUpdate) => {
    try {
      const result = await axios.put(meetingsController, meetingToUpdate);
      return result;
    } catch (error) {
      return false;
    }
  };

  const postMeeting = async (newMeeting) => {
    try {
      const result = await axios.post(meetingsController, newMeeting);
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteMeeting = async (id) => {
    try {
      const result = await axios.delete(`${meetingsController}/${id}`);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getAll,
    getById,
    postMeeting,
    putMeeting,
    deleteMeeting,
  };
})();

export default MeetingsService;
