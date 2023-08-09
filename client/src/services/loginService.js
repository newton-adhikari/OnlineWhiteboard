import axios from "axios";
const baseUrl = "http://localhost:12222";

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/api/login`, credentials);
  return response;
}

export default { login };