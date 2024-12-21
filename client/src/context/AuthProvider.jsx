import { createContext, useContext } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const handleSearch = () => {
    console.log("search username");
  };

  const handlePost = () => {
    console.log("create new post");
  };

  const handleNavigate = (params) => {
    console.log(`navigate to ${params}`);
  };
  return (
    <AuthContext.Provider value={{ handleNavigate, handleSearch, handlePost }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
