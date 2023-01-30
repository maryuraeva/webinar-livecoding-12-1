import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import Ducks from "./Ducks.js";
import MyProfile from "./MyProfile.js";
import ProtectedRoute from "./ProtectedRoute";
import * as duckAuth from "../duckAuth.js";
import "./styles/App.css";
import withRouter from "../utils.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.tokenCheck();
  }

  handleLogin() {
    this.setState({
      loggedIn: true,
    });
  }

  tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email,
          };
          this.setState(
            {
              loggedIn: true,
              userData,
            },
            () => {
              this.props.router.navigate("/ducks");
            }
          );
        }
      });
    }
  };

  render() {
    return (
      <Routes>
        <Route
          path="/ducks"
          element={
            <ProtectedRoute loggedIn={this.state.loggedIn} component={Ducks} />
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute
              loggedIn={this.state.loggedIn}
              userData={this.state.userData}
              component={MyProfile}
            />
          }
        />
        <Route
          path="/login"
          element={
            <div className="loginContainer">
              <Login
                handleLogin={this.handleLogin}
                tokenCheck={this.tokenCheck}
              />
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
          element={
            this.state.loggedIn ? (
              <Navigate to="/ducks" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    );
  }
}

export default withRouter(App);
