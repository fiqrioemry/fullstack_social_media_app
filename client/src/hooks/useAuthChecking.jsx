import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const useAuthChecking = () => {
  const location = useLocation();
  const background = location.state?.background;
  const { authCheck, checkingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return { checkingAuth, location, background };
};

export default useAuthChecking;
