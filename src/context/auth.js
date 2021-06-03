import { createContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const user = {
    name: "Felipe",
  };

  return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };
