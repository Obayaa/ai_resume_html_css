import API_URL from "../context/constants/constants";

const signup = async (data) => {
    let url = `/signup`;
    try {
      const response = await API_URL.post(url, data, false);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export default {
    signup
  }