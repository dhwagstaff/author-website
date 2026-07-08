const form = document.getElementById("newsletterForm");
const emailField = document.getElementById("email");
const statusMessage = document.getElementById("statusMessage");

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzyHN1xz_XTFeiC8_1sB1utAMAg60whUnXYFvy0qg_H1vMPFnG6kZ3dMUMyFovovhwnxg/exec";

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = emailField.value.trim();

    if (email.length === 0) {
        return;
    }

    statusMessage.textContent = "Joining...";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("source", "Website");
    formData.append("campaign", "Homepage");
    formData.append("interestedIn", "General");

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            statusMessage.textContent = "Thank you for joining the reader list!";
            emailField.value = "";
        } else {
            statusMessage.textContent = result.message || "Unable to join. Please try again.";
        }

    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Connection error.";
    }
});
