

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEducation } from "../redux/educationSlice";
import { updateProfile } from "../redux/profileSlice";
import { updateProject } from "../redux/projectSlice";
import { updateExperience } from "../redux/experienceSlice";
import axios from "axios";
import { BASE_URL } from "../api";
import {
  updateAchievements,
  updateExtraCoCurricular,
  updateSkills,
} from "../redux/extraDetailsSlice";
import {logoutUser} from "../redux/userSlice";
import Chat from "./Chat";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff6f61",
    },
    background: {
      default: "#ffecd6",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
});

export default function LandingPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log("current user:", currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Loading state for data fetch
  useEffect(() => {
    console.log("Current User:", currentUser);
    if (currentUser) {
      getAllResumeData(); // Fetch resume data only when currentUser is available
    } else {
      console.error("User not found in Redux state.");
      setLoading(false); // If no user, stop loading
    }
  }, [currentUser]);

  const getAllResumeData = async () => {
    if (!currentUser || !currentUser._id) {
      console.error("User not found in Redux state.");
      setLoading(false); // Stop loading if user is not found
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`,
        {
          headers: {
            authorization: currentUser.token,
          },
        }
      );

      const resumeData = response.data.resumeData[0];
      if (resumeData) {
        dispatch(updateProfile(resumeData.profile));
        dispatch(updateEducation(resumeData.education[0]));
        
        resumeData.projects.forEach((project, index) => {
          Object.keys(project).forEach((field) => {
            dispatch(updateProject({ index, field, value: project[field] }));
          });
        });

        resumeData.experience.forEach((experience, index) => {
          Object.keys(experience).forEach((field) => {
            dispatch(
              updateExperience({ index, field, value: experience[field] })
            );
          });
        });

        const { skills, achievements, extraCoCurricular } = resumeData.extraDetails;

        Object.keys(skills).forEach((type) => {
          skills[type].forEach((skill, index) => {
            dispatch(updateSkills({ type, index, value: skill }));
          });
        });

        achievements.forEach((achievement, index) => {
          dispatch(updateAchievements({ index, value: achievement }));
        });

        extraCoCurricular.forEach((activity, index) => {
          dispatch(updateExtraCoCurricular({ index, value: activity }));
        });
      }
    } catch (error) {
      console.error("Error in getAllResumeData:", error);
    } finally {
      setLoading(false); // Stop loading after the data is fetched or failed
    }
  };

   // Trigger effect when currentUser changes

  const handleGetStarted = () => {
    navigate("/profile");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="box-container" sx={{ display: "flex", height: "100vh" }}>
        {/* Left side for text content */}
        <Box
          sx={{
            width: "50vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#99C9ED",
          }}
        >
          <div style={{ color: "black", maxWidth: "500px" }}>
            <Container maxWidth="sx" className="text">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Typography
                  className="heading"
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: "800" }}
                >
                  Unlock Your Dream Job with Our Cutting-Edge Resume Builder App.
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Typography
                  variant="h5"
                  component="h1"
                  className="para"
                  gutterBottom
                >
                  Create a resume that truly reflects your skills, experience,
                  and personality with our intuitive resume builder. Choose from
                  a wide range of customizable templates, each carefully designed
                  to help you showcase your strengths and achievements.
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <Button
                  onClick={handleGetStarted}
                  variant="outlined"
                  className="cta-btn"
                  sx={{
                    color: "white",
                    backgroundColor: "#000000",
                    padding: "15px 50px",
                    "&:hover": {
                      color: "grey",
                      backgroundColor: "#000000",
                      border: "none",
                    },
                    border: "none",
                    fontWeight: 600,
                  }}
                  size="large"
                >
                  Get Started
                </Button>
              </motion.div>
              <div>
            <h1>Welcome to AI Chatbot</h1>
            <Chat />
        </div>
            </Container>
          </div>
        </Box>

        {/* Right side for image */}
        <Box className="img-container">
          {/* Additional image containers can be added here if needed */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

