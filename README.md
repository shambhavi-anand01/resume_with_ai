#AI-Powered Resume Builder
    An intelligent, user-friendly platform that helps users create and customize resumes using professionally designed templates. It integrates real-time AI assistance and allows users to save and edit resumes     anytime with a seamless experience.

🔗 Live Demo: https://resume-with-ai.vercel.app

🧠 Why This Project?
    The traditional resume-building process is time-consuming, especially for freshers and professionals who struggle with wording, structure, or formatting. This project was born to solve real-world job-seeking     problems by combining:
        -AI-powered content generation
        -Template personalization
        -Resume saving and editing functionalities
    Our goal was to simplify the resume-building journey for everyone and make the process more modern, efficient, and intelligent.

🌱 What I Learned
    🔐 Implemented Firebase Google Auth for secure login and signup.
    ⚙️ Gained real-world experience integrating Generative AI APIs.
    🧠 Learned how to design for different user types (Freshers vs Professionals).
    🗂️ Practiced MERN full-stack development with cloud-hosted DB (MongoDB Atlas).
    🧾 Built logic for resume content persistence and download in future versions (PDF/DOCX).
    🌐 Understood deployment pipelines using Vercel (frontend) and Render (backend).

🧱 Tech Stack
    Frontend: React (Vite), Tailwind CSS
    Backend: Node.js, Express.js
    Database: MongoDB Atlas
    Authentication: Firebase (Google)
    AI Integration: Google Generative AI API
    Deployment: Vercel (frontend), Render (backend)

📐 System Architecture
             +---------------------------+
                  |      React Frontend       |
                  |   (Vite + Tailwind CSS)   |
                  +---------------------------+
                              |
                              |  REST API Calls
                              v
                  +---------------------------+
                  |      Express Backend       |
                  |      (Node.js Server)      |
                  +---------------------------+
                        |              |
         MongoDB Atlas  |              | Google Generative AI API
     (Cloud DB - User   |              |  (Content suggestions)
    resumes, profiles)  |              |
                        v              v
                Firebase Auth      AI Response Handler
            (Google Sign In, JWT)     (Summary, Skills, etc.)

            
🚀 Features
    🔐 Google Authentication via Firebase
    🎨 Customizable Templates for Freshers & Professionals
    💾 Save & Edit Resume Content
    🤖 Real-time AI Chatbot for content generation
    📑 Multiple Resume Cards with click-to-edit behavior
    💡 Dynamic Routing based on user type

📍 Feature Development Roadmap
Feature	Status
    User Authentication (Google/Firebase)	✅ Completed	JWT token-based session
    Resume Templates UI	                    ✅ Completed	Two resume cards, different for user types
    Resume Data Persistence (MongoDB)	    ✅ Completed	Save and retrieve via REST API
    Generative AI Integration	            ✅ Completed	Google Gen AI API for smart suggestions
    PDF/DOCX Resume Download	            ✅ Completed	pdf or docx
    Resume Preview with Live Editing	    ✅ Completed	Resume appears in editable format
    Mobile Responsiveness	                ⏳ Upcoming	Planned improvements
    Resume Suggestions from Templates	    ⏳ Upcoming	AI-powered template recommendation

    
🖥️ Installation & Setup
    Prerequisites
    Node.js and npm
    MongoDB Atlas account
    Firebase project
    Google Generative AI API Key

Clone the Repo
    git clone https://github.com/yourusername/ai-resume-builder.git
    cd ai-resume-builder
    
Backend Setup
    cd backend
    npm install
    Create .env:

env
    MONGO_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    GOOGLE_API_KEY=your_genai_api_key
    
Run backend:
    npm start

Frontend Setup
    cd frontend
    npm install
    
Create .env:
    VITE_FIREBASE_API_KEY=your_firebase_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_APP_ID=your_app_id
    
Run frontend:
    npm run dev


🤝 Contributing
Want to contribute or suggest new features? Open an issue or submit a pull request!

🙋‍♀️ Developed By
Shambhavi Anand
📫 https://www.linkedin.com/in/shambhavi-anand-520391187/
