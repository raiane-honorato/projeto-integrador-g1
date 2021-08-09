import { createContext, useState } from "react";
import useStorage from "../utils/useStorage.js";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
