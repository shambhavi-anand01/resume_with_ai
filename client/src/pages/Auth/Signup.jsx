import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // Container to display toast notifications
import { useState } from "react";
import SignIn from "./SignInWithGoogle"; // Google Sign-In component
import { handleError, handleSuccess } from "../../utils"; // Utility functions for toast messages
import "../../styles/Signup.css"; // Custom CSS styling

function Signup() {

    // State to hold input values for the signup form
    const [signupInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Hook to programmatically navigate

    // Handles changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Updates the corresponding field in the state
        setSignUpInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Handles the signup form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevents default form reload

        const { name, email, password } = signupInfo;

        // Checks if any field is empty
        if (!name || !email || !password) {
            return handleError('Username, email and password required');
        }

        try {
            const url = "https://resume-with-ai.onrender.com/api/auth/signup";

            // Sends POST request to backend API with user data
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();

            // If successful, display success toast and redirect to login
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                // If not successful, show error message
                handleError(result.message || "Signup failed");
            }
        } catch (err) {
            // Handle network or server errors
            handleError("Network error: Unable to connect to server");
        }
    };

    return (
        <div className="Top-container">
            <div className="Signup-container">
                <h1>Sign Up</h1>

                {/* Signup form */}
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
                            placeholder="Enter your password.. "
                            value={signupInfo.password}
                        />
                    </div>

                    {/* Submit button */}
                    <button type="Submit" className="signup-btn">Sign up</button>

                    {/* Separator */}
                    <span className="option">or</span>

                    {/* Google Sign-In component */}
                    <SignIn />

                    {/* Link to login page */}
                    <span>Already have an account? <Link to='/login'>Login</Link></span>
                </form>

                {/* Toast container for notifications */}
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
