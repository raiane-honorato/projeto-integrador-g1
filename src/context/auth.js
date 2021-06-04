import { createContext } from "react";
import useStorage from "../utils/useStorage.js";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useStorage('token');

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
