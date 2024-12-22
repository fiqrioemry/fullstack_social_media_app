import { useNavigate } from "react-router-dom";
import { handleResize } from "../hooks/handleResize";
import { handleClickOutside } from "../hooks/handleClickOutside";
import { createContext, useContext, useRef, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const searchPanel = useRef(null);
  const [active, setActive] = useState(false);
  const [postModal, setPostModal] = useState({
    createPost: false,
    discardPost: false,
    settingPost: false,
  });

  const handleOpenPostModal = (name) => {
    setPostModal((prev) => ({ ...prev, [name]: true }));
  };

  const handleClosePostModal = (name) => {
    setPostModal((prev) => ({ ...prev, [name]: false }));
  };
  const handleNavigate = (params) => navigate(`/${params}`);

  const toggleSearch = () => setActive((prev) => !prev);

  // Hook search panel
  handleResize({ active, setActive });
  handleClickOutside({ active, setActive, searchPanel });

  return (
    <AuthContext.Provider
      value={{
        handleNavigate,
        toggleSearch,
        active,
        postModal,
        handleOpenPostModal,
        handleClosePostModal,
        searchPanel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
