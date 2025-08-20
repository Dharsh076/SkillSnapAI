# 🧠 SkillSnap AI – Chrome Extension for Skill Analysis

SkillSnap AI is a smart Chrome extension that helps job seekers extract and analyze skills directly from job descriptions on any webpage. With a single click, it identifies **hard** and **soft** skills using GPT-4 and presents them in a clean, organized interface.

---

## 🚀 Features

- ✅ Extracts **highlighted/selected text** from webpages
- ✅ Sends it to a **Flask backend** powered by **GPT-4**
- ✅ Categorizes skills into:
  - 🔧 Hard Skills
  - 💬 Soft Skills
- ✅ Displays results inside the extension popup
- ✅ Maintains a history of the last 5 analyses
- ✅ Built using **React + Vite + TailwindCSS**
- ✅ Connected to a **Render-hosted Flask API**

---

## 🖼️ Demo

https://github.com/Dharsh076/skillsnap/assets/
<img width="1614" height="937" alt="Screenshot 2025-08-20 133605" src="https://github.com/user-attachments/assets/549f170b-8f26-4727-b42f-1cc9fd0b9a78" />
<img width="832" height="546" alt="Screenshot 2025-08-20 133638" src="https://github.com/user-attachments/assets/fe20b4de-493c-479e-a215-260c22d0e314" />
<img width="825" height="547" alt="Screenshot 2025-08-20 133648" src="https://github.com/user-attachments/assets/66030068-5eb9-4e6a-9b38-10c9175e27c0" />
<img width="843" height="685" alt="Screenshot 2025-08-20 133747" src="https://github.com/user-attachments/assets/28b7ebdc-4f9c-4743-8ef7-e25348e1c952" />

---


## 🛠️ Tech Stack

### Frontend:
- React (Vite + TailwindCSS)
- Chrome Extension APIs
- Manifest V3

### Backend:
- Flask + OpenAI GPT-4
- Deployed on [Render](https://skillsnapai-1.onrender.com)

---

## 📦 Project Structure

```bash
skillsnap/
├── extension/         # Chrome extension frontend
│   ├── public/        # Icons, manifest.json
│   ├── src/           # React components
│   ├── contentScript.js
│   ├── main.jsx
│   ├── styles.css
│   └── vite.config.js
└── backend/           # Flask backend
    ├── app.py
    ├── requirements.txt
    └── .env (OpenAI key)
```

---

## 🧪 How It Works

1. Highlight any job description or resume section.
2. Click `Extract Text` → the selected text is loaded.
3. Click `Analyze` → the extension sends the text to the Flask backend.
4. GPT-4 responds with categorized skills.
5. Results are shown inside the extension and stored in history.

---

## 🔒 Requirements

- Node.js + npm
- Python 3.8+
- OpenAI API key (add to `.env` as `OPENAI_API_KEY`)

---

## 🧠 Future Improvements

- ✅ Loading spinner while analyzing
- 🔄 Export results to PDF/CSV
- 🔍 Search inside history
- 🎯 Auto-suggestion of resume improvements

---

## 🤝 Contributing

Pull requests welcome! Feel free to fork and submit suggestions.

---

## 📧 Contact

- LinkedIn: [Dharshini Vasudevan](https://www.linkedin.com/in/dharshiniv/)
- GitHub: [@Dharsh076](https://github.com/Dharsh076)
- Email: dharshinivasudevan99@gmail.com

---

> ⚡ Built with purpose — to help you apply smarter, not harder.
