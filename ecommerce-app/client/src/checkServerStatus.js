import axios from "axios";
const checkServerStatus = async () => {
  try {
    const response = await axios.get(`/`);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error("Error checking server status:", error);
  }
};

export default checkServerStatus;
