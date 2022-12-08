import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authLoading) {
      getUser();
    }
  }, [authLoading]);

  const getUser = async () => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/api/get_user_data`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setAuthLoading(false));
  };

  const value = {
    user,
    authLoading,
    setAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error("Error using Auth Context");
  } else {
    return context;
  }
};
