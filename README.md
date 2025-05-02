# NutriTrack

[![Netlify Status](https://api.netlify.com/api/v1/badges/b925b9f5-5472-4beb-9752-23f67304e6ce/deploy-status)](https://app.netlify.com/sites/nutritrackpdc/deploys)

Personalized nutrition and diet companion app that generates AI-powered meal plans based on your health goals, preferences, and restrictions.

---

## 🚀 Live Demo
- **Frontend:** [https://nutritrackpdc.netlify.app/](https://nutritrackpdc.netlify.app/)
- **Backend:** [https://personalized-diet-companion.onrender.com/](https://personalized-diet-companion.onrender.com/)

---

## 📝 Features
- Personalized meal and diet plans using Gemini AI
- User authentication (email/password, Google OAuth)
- Cuisine and dietary preference selection
- Macronutrient and calorie breakdown
- Shopping list generator
- Responsive dashboard UI

---

## 🛠️ Tech Stack
- **Frontend:** React, Redux, Axios, Netlify
- **Backend:** Node.js, Express, MongoDB Atlas, Render
- **AI:** Gemini API

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nutritrack.git
cd nutritrack
```

### 2. Install dependencies
- For frontend:
  ```bash
  cd frontend
  npm install
  ```
- For backend:
  ```bash
  cd backend
  npm install
  ```

### 3. Environment Variables
- **Frontend:** Create a `.env` file in `/frontend`:
  ```env
  REACT_APP_API_URL=https://personalized-diet-companion.onrender.com/api
  REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
  ```
- **Backend:** Create a `.env` file in `/backend`:
  ```env
  MONGO_URI=your_mongodb_atlas_uri
  JWT_SECRET=your_jwt_secret
  GEMINI_API_KEY=your_gemini_api_key
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  GOOGLE_CALLBACK_URL=your_google_callback_url
  EMAIL=your_email
  GOOGLE_CLIENT_ID_GMAIL=your_gmail_client_id
  GOOGLE_CLIENT_SECRET_GMAIL=your_gmail_client_secret
  GOOGLE_REFRESH_TOKEN=your_gmail_refresh_token
  ```

### 4. Run Locally
- **Frontend:**
  ```bash
  cd frontend
  npm start
  ```
- **Backend:**
  ```bash
  cd backend
  npm start
  ```

---

## 🌐 Deployment
- **Frontend:** [Netlify](https://www.netlify.com/)
- **Backend:** [Render](https://render.com/)

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgements
- [Gemini API](https://ai.google.dev/gemini-api)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/)
- [Netlify](https://www.netlify.com/)
