<<<<<<< HEAD
# 🤖 AI Code Refine

> An AI-powered code review and auto-fix web tool built at the **NASSCOM Generative AI Hackathon** — detects bugs, suggests improvements, and rewrites code in real time using the Groq API.

---

## ✨ Features

- 🐛 **Bug Detection** — Identifies syntax errors, logic flaws, and common anti-patterns
- 🔧 **Auto-Fix** — Automatically rewrites problematic code with corrected version
- 💡 **Explanations** — Provides human-readable reasoning for every change made
- 🌐 **Multi-language Support** — Works with Python, Java, JavaScript, C, and more
- ⚡ **Real-time Response** — Powered by Groq's ultra-fast LLM inference API

---

## 🖥️ Demo

```
Input Code (Python):
──────────────────────────────────────────
def divide(a, b):
    return a / b

result = divide(10, 0)
print(result)

──────────────────────────────────────────
AI Code Refine Output:
──────────────────────────────────────────
Issue Found: ZeroDivisionError — no check for b == 0

Fixed Code:
def divide(a, b):
    if b == 0:
        return "Error: Division by zero is not allowed"
    return a / b

result = divide(10, 0)
print(result)

Explanation: Added a guard clause to handle division by zero,
preventing a runtime crash.
──────────────────────────────────────────
```

---

## 🏗️ Architecture

```
User inputs code (browser)
        ↓
   HTML/CSS Frontend
        ↓
   Python Backend (Flask/requests)
        ↓
   Groq API (LLM inference)
   └── Prompt: "Review this code, identify bugs, return fixed version + explanation"
        ↓
   Parsed response → displayed in UI
```

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3 |
| Backend | Python |
| AI Engine | Groq API (LLaMA / Mixtral) |
| Deployment | Local / lightweight server |

---

## 🚀 Getting Started

```bash
git clone https://github.com/jcreddy-6/ai-code-refine
cd ai-code-refine

# Install dependencies
pip install -r requirements.txt

# Add your Groq API key
export GROQ_API_KEY=your_api_key_here
# Get a free key at: https://console.groq.com

# Run the app
python app.py
```

Then open `http://localhost:5000` in your browser.

---

## 📂 Project Structure

```
ai-code-refine/
├── static/
│   ├── style.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py              # Python backend + Groq API integration
├── requirements.txt
└── README.md
```

---

## 🌟 Built At

- **Event:** NASSCOM Generative AI Hackathon
- **Theme:** Building real-world applications using Generative AI APIs

---

## 📜 License

MIT License — free to use and modify.

---

## 👤 Author

**Thigulla Jhansi Chandra Reddy**
2nd Year B.Tech CSE — Anurag University, Hyderabad
[LinkedIn](https://www.linkedin.com/in/jhansi-chandra-reddy-a14b15382/) | [GitHub](https://github.com/jcreddy-6)
=======
# ai-code-refine
>>>>>>> 74d264c859d7ef9d5910399cca016abdcf6e06a0
