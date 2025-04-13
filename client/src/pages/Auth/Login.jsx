import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SignIn from "./SignInWithGoogle"; // Google sign-in component
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";
import { handleError, handleSuccess } from "../../utils"; // Custom toast messages

import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../../redux/userSlice"; // Redux actions

function Login() {
  // State to store email and password input
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update loginInfo state when user types into input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    try {
      dispatch(signInStart()); // Start loading state in Redux
      const url = "https://resume-with-ai.onrender.com/api/auth/login";

      // Send POST request to backend with login credentials
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        // If login is successful
        handleSuccess(message); // Show success toast
        localStorage.setItem("token", jwtToken); // Save token to local storage
        localStorage.setItem("loggedInUser", name); // Save username
        dispatch(signInSuccess({ name, jwtToken })); // Update Redux store

        // Redirect to homepage after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // If login fails
        dispatch(signInFailure(message || "Login failed"));
        handleError(message || "Login failed");
      }

    } catch (err) {
      // Catch any errors from the request
      dispatch(signInFailure(err.message));
      handleError(err);
    }
  };

  return (
    <div className="Top-container">
      <div className="Login-container">
        <h1>Login</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
            />
          </div>

          <button type="submit">Login</button>

          <span className="option">or</span>

          {/* Google Sign-In Component */}
          <SignIn />

          {/* Link to Signup page */}
          <span>
            Doesn't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>

        {/* Toast container for success/error messages */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
