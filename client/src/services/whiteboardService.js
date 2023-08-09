import axios from "axios";
const baseUrl = "http://localhost:12222";

const getWhiteboard = async token => {
  const bearerToken = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(`${baseUrl}/api/whiteboard`, bearerToken);
  console.log("Response from /whiteboard: ", response)
  return response;
}

export default { getWhiteboard };