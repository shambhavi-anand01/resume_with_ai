import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import SignIn from "./SignInWithGoogle";
import "react-toastify/dist/ReactToastify.css";
import  "../../styles/Login.css";
import { handleError, handleSuccess } from "../../utils";


import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../../redux/userSlice";


function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    // if (!email || !password) {
    //   return handleError("email and password are required");
    // }
    try {
      dispatch(signInStart());
      const url = "http://localhost:5000/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        dispatch(signInSuccess({name, jwtToken}))
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(signInFailure(message || "Login failed"));
        handleError(message || "Login failed");
      }
      //  else if (error) {
      //   const details = error?.details[0].message;
      //   handleError(details);
      // }
      //  else if (!success) {
      //   handleError(message);
      // }
      // console.log(result);
    } 
    
    
    
    catch (err) {
      dispatch(signInFailure(err.message));
      handleError(err);
    }
  };

  return (
    <div className="Top-container">
      <div className="Login-container">
        <h1>Login</h1>
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
          <SignIn/>
          <span>
            Does't have an account ?<Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
