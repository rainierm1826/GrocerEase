import axios from "axios";

const auth = axios.create({
  baseURL: "https://grocerease-backend-7b5o.onrender.com/auth",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const loginAdmin = async (email, password) => {
  try {
    const { data } = await auth.post(
      "/admin/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

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
    const response = await auth.get("/logout", { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
