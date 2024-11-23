import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:5000/auth",
  withCredentials: true,
});

export const fetchUser = async () => {
  try {
    const { data } = await auth.get("/user");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await auth.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
