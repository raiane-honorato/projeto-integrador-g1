import { createContext } from "react";

const AuthContext = createContext({
  token: null,
  setToken: () => {}
});

const AuthProvider = ({ children }) => {

  return (
    <AuthContext.Provider value={{ token, setToken }}>
        {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
