import axios from "axios";
import appConfig from "../../appconfig";

const option = () => {
  return {
    baseURL: appConfig.ApiUrl,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin' : '*',
    },
    withCredentials: false
  };
};

const GetAllTrackers = async () => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.get(
      `api/Tracker`
    );
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};

const GetTrackerByHistories = async (id) => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.get(
      `api/Tracker/history?id=${id}`
    );
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
const GetGoogleRank = async tracker => {
  try {
    const apiCaller = axios.create(option());
    const response = await apiCaller.get(`/api/Tracker/google?search=${tracker.search}&url=${tracker.url}`, tracker);
    return { data: response.data, status: response?.status };
  } catch (error) {
    return { data: error.response.data, status: error.response.status };
  }
};
export { GetAllTrackers, GetTrackerByHistories, GetGoogleRank };
