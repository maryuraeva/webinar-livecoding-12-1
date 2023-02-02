import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import Ducks from "./Ducks.js";
import MyProfile from "./MyProfile.js";
import ProtectedRoute from "./ProtectedRoute";
import * as duckAuth from "../duckAuth.js";
import "./styles/App.css";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin() {
    setLoggedIn(true);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      duckAuth.getContent(jwt).then((res) => {
        setLoggedIn(true);
        setUserData({
          username: res.username,
          email: res.email,
        });
        navigate("/ducks");
      });
    }
  }

  return (
    <Routes>
      <Route
        path="/ducks"
        element={<ProtectedRoute loggedIn={loggedIn} component={Ducks} />}
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute
            loggedIn={loggedIn}
            userData={userData}
            component={MyProfile}
          />
        }
      />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register />
          </div>
        }
      />
      <Route
        path="*"
        element={loggedIn ? <Navigate to="/ducks" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
