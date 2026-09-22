/* ================= QURAN AUDIO ================= */

window.addEventListener("load", function () {

    const audio = document.getElementById("quranAudio");

    if (!audio) return;

    audio.volume = 1;

    audio.play().catch(function () {
        console.log("Autoplay was blocked by the browser.");
    });

});


/* ================= GUEST MESSAGES ================= */

/*
   IMPORTANT:
   Put your Google Apps Script Web App URL here.
*/

const SCRIPT_URL = "PUT-YOUR-GOOGLE-APPS-SCRIPT-URL-HERE";


function sendMessage() {

    const name = document
        .getElementById("guestName")
        .value
        .trim();

    const message = document
        .getElementById("guestMessage")
        .value
        .trim();

    const status = document.getElementById("messageStatus");


    if (!name || !message) {

        status.textContent =
            "Please write your name and message.";

        return;
    }


    status.textContent = "Sending...";


    fetch(SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "text/plain"
        },

        body: JSON.stringify({
            name: name,
            message: message
        })

    })

    .then(function () {

        status.textContent =
            "Your message has been sent ♡";

        document.getElementById("guestName").value = "";
        document.getElementById("guestMessage").value = "";

    })

    .catch(function () {

        status.textContent =
            "Something went wrong. Please try again.";

    });

}
