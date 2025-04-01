import React from "react";
import {
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { Call, MailOutline, LinkedIn } from "@mui/icons-material";

const Contact = () => {
  const handleSocialMediaClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        // background: "crimson",
        width: "100%",
        height: "80vh",
        marginTop: "60px",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          borderRadius: 4,
          padding: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography paragraph>
            If you have any feedback or questions about our application, feel
            free to contact us.
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Contact Information
          </Typography>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <IconButton
              sx={{
                backgroundColor: "#FFECD6",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <Call />
            </IconButton>
            <Typography>Phone: 929495XXXX</Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#FFECD6",
                borderRadius: "50%",
                padding: "10px",
              }}
            >
              <MailOutline />
            </IconButton>
            <Typography>Email: shambhavianand21@gmail.com</Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <IconButton
              sx={{
                backgroundColor: "#FFECD6",
                borderRadius: "50%",

                padding: "10px",
              }}
              onClick={() =>
                handleSocialMediaClick(
                    "https://www.linkedin.com/in/shambhavi-anand-520391187/"
                )
              }
            >
              <LinkedIn />
            </IconButton>
            <Typography>LinkedIn</Typography>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Contact;
