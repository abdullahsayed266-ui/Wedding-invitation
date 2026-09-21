function enterInvitation() {
  document.querySelector(".opening").style.display = "none";
  document.getElementById("invitation").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const weddingDate = new Date("October 3, 2026 20:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = weddingDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrL6ZjpajoLvCo4wTAZmzlaSfkwSrBgogJzI25h8dIRE75SOjLea6XYA3z-SxW1hoPDQ/exec";

function sendMessage() {
  const name = document.getElementById("guestName").value.trim();
  const message = document.getElementById("guestMessage").value.trim();
  const status = document.getElementById("messageStatus");

  if (!name || !message) {
    status.textContent = "Please write your name and message.";
    return;
  }

  status.textContent = "Sending...";

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ name: name, message: message })
  })
  .then(() => {
    status.textContent = "Your message has been sent 💌";
    document.getElementById("guestName").value = "";
    document.getElementById("guestMessage").value = "";
  })
  .catch(() => {
    status.textContent = "Something went wrong. Please try again.";
  });
}
