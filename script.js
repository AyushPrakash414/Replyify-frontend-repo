document.getElementById("generateBtn").addEventListener("click", async () => {
    const emailContent = document.getElementById("emailContent").value;
    const tone = document.getElementById("tone").value;
    const apiKey = "AIzaSyCKiGVT41_KLiZDh8IHSeWF50z-srr61EQ"; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    if (!emailContent) {
        alert("Please enter email content!");
        return;
    }

    try {
        const prompt = `Write a professional email reply in a ${tone} tone to the following email:\n\n"${emailContent}"`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

            const replyBox = document.getElementById("reply");
            replyBox.classList.add("visible");
            replyBox.innerText = reply;

            const copyBtn = document.getElementById("copyBtn");
            copyBtn.style.display = "block";

            replyBox.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            alert("Failed to generate reply. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the reply.");
    }
});

// Copy to clipboard functionality
document.getElementById("copyBtn").addEventListener("click", () => {
    const replyText = document.getElementById("reply").innerText;
    navigator.clipboard.writeText(replyText).then(() => {
        alert("Reply copied to clipboard!");
    }).catch((error) => {
        console.error("Error copying text:", error);
    });
});
