# SchemeSaathi — AI Government Scheme Finder

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![AI Powered](https://img.shields.io/badge/AI-Groq%20%7C%20Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo
[👉 SchemeSaathi Live](https://scheme-saathi-chi.vercel.app)

---

SchemeSaathi is an AI-powered web application that helps Indian citizens discover government schemes they are eligible for — based on age, income, state, category, and occupation.

---

## ✨ Features

- 🔍 Smart Eligibility Checker — Enter details once, get all eligible schemes instantly
- 🤖 AI Chatbot — Answers queries in Hindi, English and Hinglish
- 📋 Browse and Filter — 25+ government schemes across 7 categories
- 📄 PDF Download — Download eligible schemes as a professional PDF
- 👤 User Authentication — Signup and Login with JWT
- 📊 Search History — Track previous searches via MongoDB
- 👤 User Profile — View stats and quick actions
- 📱 Responsive Design — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| AI Chatbot | Groq API (Llama 3.3) |
| AI Summary | Gemini API |
| Authentication | JWT + Bcrypt |
| PDF Generation | jsPDF |
| Styling | Custom CSS |

---

## 📁 Project Structure

```
SchemeSaathi/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatbot.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── server/
│   ├── data/
│   │   └── schemes.json
│   ├── models/
│   │   ├── User.js
│   │   └── Search.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── schemes.js
│   ├── server.js
│   └── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local)
- Groq API Key — free at console.groq.com
- Gemini API Key — free at aistudio.google.com

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/awasthianshika263/SchemeSaathi.git
cd SchemeSaathi
```

**2. Setup Server**

```bash
cd server
npm install
```

**3. Create `.env` file in server folder**

Copy `.env.example` and fill in your keys:

```
GEMINI_API_KEY=your_gemini_key_here
GROQ_API_KEY=your_groq_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/govschemes
JWT_SECRET=your_secret_key_here
```

**4. Setup Client**

```bash
cd ../client
npm install
```

**5. Run the application**

Terminal 1 — Server:

```bash
cd server
npm run dev
```

Terminal 2 — Client:

```bash
cd client
npm run dev
```

**6. Open browser**

```
http://localhost:5173
```

---

## 📊 Government Schemes Covered

| Category | Examples |
|----------|---------|
| 🏠 Housing | PM Awas Yojana Gramin, PM Awas Yojana Urban |
| 📚 Education | NSP Scholarships, PM Scholarship, Central Sector Scholarship |
| 🏥 Health | Ayushman Bharat PM-JAY, Janani Suraksha Yojana |
| 🌾 Agriculture | PM Kisan Samman Nidhi, Kisan Credit Card, PM Fasal Bima |
| 💰 Finance | Atal Pension Yojana, PM Jeevan Jyoti Bima, PM Suraksha Bima |
| 🏢 Business | PM Mudra Yojana, Stand Up India, PM SVANidhi |
| 🤝 Welfare | PM Ujjwala Yojana, PM Matru Vandana, National Family Benefit |

---

## 👩‍💻 Developer

**Anshika Awasthi**
- GitHub: [@awasthianshika263](https://github.com/awasthianshika263)

---

⭐ Star this repo if you found it helpful!
