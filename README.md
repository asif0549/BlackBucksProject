# Jarvis AI - Chatbot with Dialogue Management

Jarvis AI is a hybrid, low-latency conversational chatbot that integrates deterministic local intent matching with the **Google Gemini 2.5 Flash** language model. 

Developed by **Shaik Asif**, the chatbot is designed for educational, support, and productivity applications. It runs a lightweight **Python Flask** web server on the backend and features a modern, responsive **HTML5/CSS3/JS** interface with smooth visual styling.

---

## 🌟 Key Features

1. **Hybrid Execution Engine**:
   - Matches queries against local patterns (`creator_info`, `language_support`, `about`, `boss`) inside `intents.json`.
   - Automatically routes general queries to **Gemini 2.5 Flash** if no local intent is found.
2. **On-the-Fly Dynamic Config Reloading**:
   - Reads and parses `intents.json` dynamically on every request. 
   - Allows developers to add, edit, or remove intents instantly without restarting the Flask server.
3. **Identity System Instructions**:
   - Enforces a model persona (*"Jarvis AI developed by Mr. Asif"*), reply guidelines (conciseness by default, detailed on demand, bullet points, side-headings), and behavior safeguards.
4. **Markdown Formatting Post-Processor Filter**:
   - A Python-level filter strips raw formatting tags (like asterisks `*`, hashes `#`, underscores `_`, and backticks `` ` ``) before returning the response text, presenting a clean plain text result in the UI bubbles.
5. **Fluid Real-Time Typewriter Interface**:
   - Displays bot responses word-by-word using a JavaScript typewriter script (45ms interval).
   - Locks the text field and send button while generating and typing messages to prevent input spam.
6. **Fixed-Size Visual Shell**:
   - Centered title `"Chatbot by Asif"` with glowing text-shadow, fixed-dimension glassmorphism chat panel (`700px` width, `600px` height) preventing vertical sizing shifts, and dark theme (`#0d0d0d`).

---

## 📂 Project Directory Structure

```text
├── app.py                  # Main Flask web server router
├── chatbot.py              # Optional CLI terminal loop console utility
├── chatbot_logic.py        # Core brain: loads intents dynamically, filters tags, queries GenAI
├── intents.json            # Simplified JSON config file containing local pattern databases
├── README.md               # Markdown documentation guide
├── readme.docx             # Word Document setup manual
├── static/
│   ├── script.js           # Client-side: AJAX fetch, typewriter loop, and input locking
│   └── style.css           # Styling: 600px fixed container, layout flexbox, dark theme
└── templates/
    └── index.html          # Web page structural outline
```

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies
Ensure you have Python 3.12+ installed. Install the required libraries using pip:
```bash
pip install flask google-genai
```

### Step 2: Run the Application
Start the Flask web server:
```bash
python app.py
```

### Step 3: Access the Interface
Open your web browser and navigate to:
```text
http://127.0.0.1:5000/
```

---

## 🔑 API Key Configurations
The application is pre-configured with a valid API key in `chatbot_logic.py`. To swap the API key or change model parameters, edit lines 6-7 of [chatbot_logic.py](file:///d:/asif/blackbucks/chatbot_logic.py):
```python
API_KEY = "YOUR_API_KEY_HERE"
client = genai.Client(api_key=API_KEY)
```

---

## 🐳 Container Deployment (Docker)
To containerize and scale the application:

1. **Build the image**:
   ```bash
   docker build -t jarvis-ai:1.0 .
   ```
2. **Run the container**:
   ```bash
   docker run -d -p 5000:5000 --name jarvis-chatbot jarvis-ai:1.0
   ```
