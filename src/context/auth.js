import { createContext, useState } from "react";
import useStorage from "../utils/useStorage.js";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');
  const [user, setUser] = useState("");

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
