// server.js
const express = require("express");
// const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/check-email", async (req, res) => {
  const email = req.query.email;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const response = await fetch(
      `https://leakcheck.net/api/public?check=${email}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from LeakCheck:", err);
    res.status(500).json({ error: "Failed to fetch from LeakCheck" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
