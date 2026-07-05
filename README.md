# 🚀 AI Code Reviewer

An AI-powered code review application that analyzes source code, detects errors, suggests improvements, explains code, predicts output, and optimizes solutions using the Gemini API.

## ✨ Features

* 📋 Complete Code Review
* 🐞 Error Detection
* 🚀 Improvement Suggestions
* ▶️ Output Prediction
* 📖 Beginner-Friendly Code Explanation
* ⚡ Code Optimization
* 🎨 Modern Apple-inspired Glass UI
* 💻 VS Code-like Monaco Editor
* 📝 Beautiful Markdown Response Rendering
* 🌈 Syntax Highlighting for Code Blocks

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Axios
* Monaco Editor
* React Markdown
* Remark GFM
* React Syntax Highlighter
* React Icons
* CSS

### Backend

* Node.js
* Express.js
* Gemini API (`@google/genai`)
* Dotenv
* CORS

---

## 📡 API

### Generate AI Response

**POST**

```text
/ai/get-response
```

Request Body

```json
{
  "prompt": "Your source code",
  "task": "review"
}
```

### Available Tasks

| Task         | Description                               |
| ------------ | ----------------------------------------- |
| review       | Complete code review                      |
| errors       | Detect syntax, runtime and logical errors |
| improvements | Suggest improvements                      |
| output       | Predict program output                    |
| explain      | Explain code step by step                 |
| optimize     | Optimize performance and complexity       |

---

## 📸 Screenshots

<img src="/cr-ui.png" alt="UI Screenshot" width="700">

---