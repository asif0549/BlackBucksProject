const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const button = form.querySelector("button");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg === "") return;

  addMessage("user", msg);
  input.value = "";
  
  // Disable form input during bot processing and typing
  input.disabled = true;
  button.disabled = true;

  try {
    const response = await fetch(`/get?msg=${encodeURIComponent(msg)}`);
    const reply = await response.text();
    
    addMessage("bot", reply, () => {
      // Re-enable form after typing animation completes
      input.disabled = false;
      button.disabled = false;
      input.focus();
    });
  } catch (error) {
    addMessage("bot", "Connection error. Please try again.", () => {
      input.disabled = false;
      button.disabled = false;
      input.focus();
    });
  }
});

function addMessage(sender, text, onComplete) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-message" : "bot-message";
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  if (sender === "user") {
    msgDiv.innerText = text;
    if (onComplete) onComplete();
  } else {
    // Word-by-word animation for bot responses
    const words = text.split(" ");
    let index = 0;
    msgDiv.innerText = "";
    
    const interval = setInterval(() => {
      if (index < words.length) {
        msgDiv.innerText += (index === 0 ? "" : " ") + words[index];
        chatBox.scrollTop = chatBox.scrollHeight;
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 45); // Typing speed of 45ms per word
  }
}

