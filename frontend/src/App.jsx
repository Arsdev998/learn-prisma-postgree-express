// src/App.jsx
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "./features/auth/authSlice";
import Header from "./components/head/Header";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token); // Simpan token di local storage
      dispatch(googleLogin(token)).then(() => {
        navigate("/"); // Arahkan ke halaman home setelah login
      });
      window.history.replaceState({}, document.title, "/"); // Menghapus token dari URL
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken && !isAuthenticated) {
        dispatch(login({ token: storedToken }));
      }
    }
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <>
      <Header /> {/* Tambahkan Navbar */}
      <Outlet />
    </>
  );
};

export default App;
