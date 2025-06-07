/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const AuthRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/signin" />;

  return <Fragment>{children}</Fragment>;
};

export const NonAuthRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" />;

  return <Fragment>{children}</Fragment>;
};
