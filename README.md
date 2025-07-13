

# 🔐 HackAlert

HackAlert is a simple cybersecurity web tool that helps users check if their **email** or **password** has been exposed in known data breaches. It uses public APIs and presents results clearly with a user-friendly UI.

🔗 **Live Site**: [https://hackalert.onrender.com](https://hackalert.onrender.com)

---

## ✨ Features

- ✅ Check if your email is breached (via LeakCheck public API)
- 🔐 Password breach check using SHA-1 + k-Anonymity (HaveIBeenPwned)
- 📊 View latest breach summary
- 📨 Contact form via Formspree
- 📈 Chart.js support *(optional analytics)*
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### 🔹 Frontend:
- HTML, CSS, JavaScript
- Font Awesome
- Google Fonts
- Chart.js *(optional)*

### 🔹 Backend:
- Node.js + Express
- CORS
- `node-fetch`, `js-sha1`

### 🔹 Other:
- Formspree (contact form handling)
- Deployed on Render

---

## 📦 Project Structure

hackalert/ │ ├── index.html       # Main frontend ├── index.css        # Styling ├── index.js         # Frontend JS logic ├── server.js        # Express backend ├── package.json     # Node dependencies └── README.md        # Project documentation

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hackalert.git
   cd hackalert

2. Install server dependencies:

npm install


3. Start the server:

node server.js


4. Open index.html in your browser or use Live Server.




---

📝 Deployment Info (Render)

Build Command: npm install

Start Command: node server.js

Environment: Node

No environment variables used (public APIs only)



---

💬 Contact

Use the contact form on the website or DM me directly.
Formspree Endpoint Used


---

📃 License

MIT License – free to use, modify and share.


---

🙋‍♂️ Author

Made with 💻 by Krishna Yadav
🧠 Learning Web Dev • Exploring JS & Cybersecurity Tools

--
