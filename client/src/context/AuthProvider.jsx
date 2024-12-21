import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const searchPanel = useRef(null);
  const [active, setActive] = useState(false);

  const handleSearch = () => {
    setActive(!active);
  };

  const handlePost = () => {
    console.log("create new post");
  };

  const handleNavigate = (params) => {
    navigate(`/${params}`);
  };

  // Menutup search panel jika ukuran layar berubah ke mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && active) {
        setActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchPanel.current && !searchPanel.current.contains(event.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleNavigate, handleSearch, handlePost, active, searchPanel }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
