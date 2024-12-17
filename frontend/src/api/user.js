import axios from "axios";

const user = axios.create({
  baseURL: "https://final-project-grocerease.onrender.com/user",
  withCredentials: true,
});

export const updateUser = async (userInfo) => {
  try {
    const { data } = await user.put("/update", userInfo);
    return data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
