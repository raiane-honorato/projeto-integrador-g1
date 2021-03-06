import { createContext } from "react";
import useStorage from "../utils/useStorage.js";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }) => {
  
  const [token, setToken] = useStorage('token');
  const [user, setUser] = useStorage("user");

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
