function sendMessage() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const recipient = document.getElementById("recipient").value.trim();
    const message = document.getElementById("message").value.trim();

    fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, recipient, message })
    })
    .then(response => response.json())  // Parse JSON from server
    .then(data => {
        document.getElementById("status").textContent = data.status;
    })
    .catch(err => {
        console.error("Frontend error:", err);
        document.getElementById("status").textContent = "Error sending message";
    });
}