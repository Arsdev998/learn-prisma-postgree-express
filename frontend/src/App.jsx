// src/App.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "./features/auth/authSlice";
import Header from "./components/head/Header";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "./hooks/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      console.log("Token from URL:", token);
      localStorage.setItem("token", token);
      dispatch(googleLogin(token)).then(() => {
        console.log("Dispatched googleLogin with token:", token);
        navigate("/");
      });
      window.history.replaceState({}, document.title, "/");
    } else {
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (cookieToken) {
        const storedToken = cookieToken.split("=")[1];
        console.log("Token from cookie:", storedToken);
        localStorage.setItem("token", storedToken);
        if (!isAuthenticated) {
          dispatch(googleLogin()).then(() => {
            console.log(
              "Dispatched googleLogin with cookie token:",
              storedToken
            );
          });
        }
      }
    }
  }, [dispatch, navigate, isAuthenticated]);

  console.log(isAuthenticated);
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  );
};

export default App;
