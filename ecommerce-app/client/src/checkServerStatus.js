import { BACKEND_URL } from "./constants.js";
const checkServerStatus = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error checking server status:", error);
  }
};

export default checkServerStatus;
