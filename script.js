document.getElementById("generateBtn").addEventListener("click", async () => {
    const emailContent = document.getElementById("emailContent").value;
    const tone = document.getElementById("tone").value;

    if (!emailContent) {
        alert("Please enter email content!");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/email/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailContent: emailContent, tone: tone })  // Include tone in the request
        });

        if (response.ok) {
            const reply = await response.text();
            const replyBox = document.getElementById("reply");
            replyBox.classList.add("visible"); // Show the reply box
            replyBox.innerText = reply;
        } else {
            alert("Failed to generate reply. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the reply.");
    }
});
