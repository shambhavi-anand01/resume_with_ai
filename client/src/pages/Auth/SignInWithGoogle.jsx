import React, { useState } from 'react';
// Firebase configuration and authentication methods
import { app } from '../../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

// Redux for state management
import { useDispatch } from 'react-redux';

// Navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// Redux actions for login flow
import { signInFailure, signInStart, signInSuccess } from '../../redux/userSlice';

// For making API calls
import axios from 'axios';

// Toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Base URL for backend API
import { BASE_URL } from '../../api';

// Animation library (not used in this component, but imported)
import { motion } from 'framer-motion';

// Circular loading spinner
import { CircularProgress } from '@mui/material';

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State to manage loading state of the button
    const [loading, setLoading] = useState(false);

    // Function to handle Google Sign-In
    const handleGoogle = async () => {
        try {
            dispatch(signInStart());     // Start login (for Redux state like isFetching)
            setLoading(true);            // Show loading spinner

            // Create Google provider and initialize Firebase Auth
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Open Google popup to sign in
            const result = await signInWithPopup(auth, provider);

            // Create payload from user's Google account
            const formData = {
                username: result?.user?.displayName,
                email: result?.user?.email,
                avatar: result?.user?.photoURL
            };

            // Send data to backend to store user / generate token
            const response = await axios.post(`${BASE_URL}/auth/google-sign-in`, formData);

            // On success, dispatch user data and redirect
            dispatch(signInSuccess(response?.data?.user));
            toast.success(response?.data?.message, {
                position: "top-left",
                autoClose: 1500,
                theme: "light",
            });
            setLoading(false);
            navigate('/'); // Redirect to homepage after login

        } catch (error) {
            setLoading(false);
            console.error(error);
            dispatch(signInFailure(error.message));
            toast.error("Login failed. Please try again.", {
                position: "top-left",
                autoClose: 1500,
                theme: "light",
            });
        }
    }

    return (
        <div style={styles.container}>
            {/* Google Login Button */}
            <button style={styles.button} onClick={handleGoogle}>
                {loading ? (
                    <CircularProgress size={28} />
                ) : (
                    <>
                        {/* Google Logo */}
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJKSURBVHgBvZTPaxNBFMffm93VpI2QQOqpyuhFBKFbUKmguIt6j9568z+Iihd/0YiCHgTTu2BzEKkIyUkvtRk9iUa7/gVdD2o9SFZaadP9Mc7uJtvNtlmtQr+w7OzbN595b+bNQxigtn58zEGvBIglAE4BMC/Mhhib3OWNvexDbat5mDQsamo+R+QpAboEKeIcTAUcrTC/8Hkg8JumUokoTUSg8JfquDA+yt4bvW85HtlWMARucUBTDC3x+GmrsTAro6xlxP0j4DCRHm6KTExY9nLTBxizNrKYoLLk1sW/xsh86zYkFKS8+hKozehipzWysZKHaqH57hNsUySYvEsuZ899gczJpSiyf4EFrBCAwb5kTi2BvH8F1p4cnkk66vfXx8Bz82mw5vXs6yBle05ud+vMpzPlrKMnnc/cXWlyBC0NCHyYknCEqStvR10gt2K2/4L3Ioxq6aNdVNXHpU1QF+Ey8bgef5ADi/t4jvUzPBTkTByMNrt6EKq/joA8xMvC2ldj7Eaur4C1e22KnkJ7V028DVYpWEGEDpFrd5bVABaIY+XYs/OnIU2uUhYQGn1zqRqlnNXXzBfr+6pxf+4RdnT2wlSS42/HiUcP6gQh1jzQfHUzW+tG2nWsl/JKR1rg0H/9RKlYYq966UZ3mdhFGPp6DYhTBH8/527tYX1AXxNPS9RFqZmEDpIPzXy/cvHN1UNRbyRxh7eTDdPe7Y6LVWb+BBNdyPTkH3ocFtoHKIyWlEXrUoWXChzyInJTdCQDPJxuTT5nsBP6DUkW1QHQYUIiAAAAAElFTkSuQmCC"
                            alt="Google Logo"
                            style={styles.icon}
                        />
                        {/* Button Text */}
                        <p style={styles.text}>Continue With Google</p>
                    </>
                )}
            </button>
        </div>
    );
}

// Inline styles for the component
const styles = {
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 21px',
        borderRadius: '5px',
        border: 'black 2px solid',
        backgroundColor: '#fff',
        color: '#fff',
        cursor: 'pointer',
        width: '320px',
        zIndex: 1,
    },
    text: {
        fontSize: '18px',
        fontWeight: '700',
        margin: '0',
        color: '#000',
    },
    icon: {
        marginRight: '10px',
        width: '24px',
        height: '24px',
    },
};
