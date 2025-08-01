// =================== MENU TOGGLE ===================
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".afterIcon");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".Menu") && !e.target.closest(".menu-toggle")) {
    menu.classList.remove("show");
  }
});

// =================== EMAIL BREACH CHECK ===================
const emailInput = document.querySelector(".emailInput");
const checkBreachBtn = document.querySelector(".CheckBreach");
const emailResultDiv = document.querySelector(".emailResult");

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/i;
  return emailPattern.test(email);
}

checkBreachBtn.addEventListener("click", () => {
  handleCheckEmail();
});

let emailKeyAdded = false;
emailInput.addEventListener("focus", () => {
  if (!emailKeyAdded) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleCheckEmail();
      }
    });
    emailKeyAdded = true;
  }
});

function handleCheckEmail() {
  const email = emailInput.value.trim();
  if (isValidEmail(email)) {
    checkEmail(email);
  } else {
    alert("❌ Invalid Email. Sahi se likh 🧠");
  }
}

async function checkEmail(email) {
  checkBreachBtn.disabled = true;
  emailResultDiv.innerText = "🔍 Checking, please wait...";
  emailResultDiv.style.color = "blue";

  const baseURL =
    location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://hackalert.onrender.com";

  try {
    const res = await fetch(`${baseURL}/check-email?email=${encodeURIComponent(email)}`);
    const data = await res.json();

    if (data.success && data.found) {
      const count = data.sources.length;
      const sampleSources = data.sources.slice(0, 3).join(", ");

      emailResultDiv.innerText = `❌ Found in ${count} breaches`;

      emailResultDiv.style.color = "red";
    } else if (data.error === "Not found") {
      emailResultDiv.innerText = "✅ No breach found";
      emailResultDiv.style.color = "green";
    } else {
      emailResultDiv.innerText = `⚠️ Error: ${data.error || "Could not check email"}`;
      emailResultDiv.style.color = "orange";
    }
  } catch (err) {
    console.error(err);
    emailResultDiv.innerText = "❌ Network or server error";
    emailResultDiv.style.color = "orange";
  }

  checkBreachBtn.disabled = false;
}


// =================== PASSWORD BREACH CHECK ===================
const passInput = document.querySelector(".passwordInput");
const checkPassBtn = document.querySelector(".CheckPassword");
const passResultDiv = document.querySelector(".passResult");

checkPassBtn.addEventListener("click", handlePasswordCheck);

let passKeyAdded = false;
passInput.addEventListener("focus", () => {
  if (!passKeyAdded) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handlePasswordCheck();
    });
    passKeyAdded = true;
  }
});

function handlePasswordCheck() {
  const password = passInput.value.trim();
  if (password !== "") {
    checkPassword(password);
  } else {
    alert("🔐 Password likh bhai");
  }
}

async function checkPassword(password) {
  passResultDiv.innerText = "🔍 Checking password...";
  passResultDiv.style.color = "blue";

  const hash = sha1(password).toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();

    const found = text.split("\n").find((line) => line.startsWith(suffix));

    if (found) {
      const count = found.split(":")[1].trim();
      passResultDiv.innerText = `❌ Found in ${count} breaches`;
      passResultDiv.style.color = "red";
    } else {
      passResultDiv.innerText = "✅ Password not found in any known breaches";
      passResultDiv.style.color = "green";
    }
  } catch (err) {
    console.error(err);
    passResultDiv.innerText = "❌ Error checking password";
    passResultDiv.style.color = "orange";
  }

  passInput.value = "";
}

// =================== SCROLL TO FOOTER ===================
function scrollToFooter() {
  document.querySelector("footer").scrollIntoView({ behavior: "smooth" });
}

// =================== RECENT BREACH DISPLAY ===================
async function loadRecentBreaches() {
  try {
    const res = await fetch("https://haveibeenpwned.com/api/v3/latestbreach");
    const data = await res.json();

    document.querySelector(".info h3").innerText = data.Name;
    document.querySelector(".info h4").innerHTML = `<a href="https://${data.Domain}" target="_blank">${data.Name}</a>`;
    document.querySelector(".info h5").innerText = data.BreachDate;
    document.querySelector(".info h6").innerText = data.PwnCount;
    document.querySelector(".description").innerHTML = data.Description;
  } catch (err) {
    console.error("Error loading breach data:", err);
  }
}

loadRecentBreaches();

