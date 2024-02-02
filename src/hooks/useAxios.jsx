import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-server-beige.vercel.app/v1",
  withCredentials: true,
});
const useAxios = () => {
  return instance;
};

export default useAxios;
