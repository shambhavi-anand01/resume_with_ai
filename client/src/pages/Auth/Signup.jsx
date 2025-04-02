import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { useState } from "react";
import SignIn from "./SignInWithGoogle";
import { handleError, handleSuccess } from "../../utils";
import  "../../styles/Signup.css";
function Signup() {

    const[signupInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value} = e.target;
        // console.log (name,value);
        // const copySignUpInfo = { ...signupInfo };
        // copySignUpInfo[name] = value;
        setSignUpInfo((prev)=>({...prev, [name]: value}));
    }
   

    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name, email, password} =  signupInfo;
        if(!name || !email || !password){
            return handleError('Username , email and password required')
        }
        try{
            const url = "https://resume-with-ai.onrender.com/api/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(signupInfo)
            });
            // const result = await response.json();
            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(result.message || "Signup failed");
            }
        } catch (err) {
            handleError("Network error: Unable to connect to server");
        }
    };
  return (
    <div className="Top-container">
      <div className="Signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name.. "
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your Email.. "
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your password.. "
            value={signupInfo.password}
          />
        </div>

        <button type="Submit" className="signup-btn">Sign up</button>
        <span className="option">or</span>
          <SignIn/>
        <span>Already have an account ?
            <Link to ='/login'>Login</Link>
        </span>

      </form>
      <ToastContainer />
    </div>
    </div>
    
  );
}

export default Signup;
