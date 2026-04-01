# 🧠 ResearchSquad AI

### Multi-Agent AI Research System (4-Agent Architecture)

🚀 ResearchSquad AI is an advanced multi-agent system that autonomously conducts research, analyzes information, and generates structured reports using a team of specialized AI agents.

---

## 🔥 Overview

ResearchSquad AI simulates a **collaborative research team**, where each AI agent has a defined role:

* 🔍 **Researcher** → Gathers information
* 📊 **Analyst** → Processes & extracts insights
* ✍️ **Writer** → Generates structured reports
* 🧠 **Editor** → Refines and validates output

👉 This system demonstrates real-world **AI orchestration**, **task decomposition**, and **agent collaboration**.

---

## ⚡ Key Features

### 🤖 Multi-Agent Intelligence

* 4 specialized agents working in coordination
* Task decomposition and sequential reasoning
* CrewAI-based orchestration

### 🌐 Full-Stack Application

* Next.js 14 frontend (TypeScript)
* FastAPI backend (Python)
* RESTful API architecture

### 🧾 Research Management

* Save & view research history
* Search and filter functionality
* Tag-based organization

### ⭐ Advanced Features

* Favorites / Starred research
* Shareable research links (public access)
* Templates for reusable workflows
* Compare research (side-by-side diff view)

### 📤 Export System

* PDF export (ReportLab)
* Batch export (ZIP, CSV)

### 🔐 Authentication & Security

* User authentication (login/signup)
* Encrypted API key storage (Groq API)

### 💬 Agent Chat View

* Real-time conversation between agents
* Expandable chat interface
* Transparent reasoning pipeline

### 🎨 UI/UX

* Dark glassmorphism theme
* Framer Motion animations
* Responsive design

---

## 🏗️ Architecture

### 🧩 System Flow

User Input
↓
Researcher Agent
↓
Analyst Agent
↓
Writer Agent
↓
Editor Agent
↓
Final Research Output

---

### 🖥️ Project Structure

```bash
KIMI-MULTI-AGENT/
├── agents/
│   ├── researcher.py
│   ├── analyst.py
│   ├── writer.py
│   └── editor.py
├── frontend/src/app/
│   ├── page.tsx
│   ├── history/
│   ├── auth/
│   └── settings/
├── database.py
├── api.py
└── requirements.txt
```

---

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* SQLAlchemy
* CrewAI
* SQLite / PostgreSQL
* Groq API

### Frontend

* Next.js 14
* TypeScript
* Tailwind CSS
* Framer Motion

### Tools & Libraries

* ReportLab (PDF generation)
* REST APIs
* LocalStorage

---

## 🚀 Features Roadmap (30-Day Build)

### ✅ Completed (Days 1–17)

* Multi-agent system (4 agents)
* FastAPI backend with DB
* Authentication system
* Research history
* PDF export
* Real-time status updates
* Glassmorphism UI

### 🔜 Advanced Features (Days 18–30)

* User API key management
* Shareable research links
* Favorites & tagging system
* Batch export (ZIP/CSV)
* Agent chat visualization
* Templates system
* Research comparison
* Notifications & shortcuts
* Onboarding tour
* Final polish & documentation

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/researchsquad-ai.git

# Backend setup
cd researchsquad-ai
pip install -r requirements.txt

# Run backend
uvicorn api:app --reload

# Frontend setup
cd frontend
npm install

# Run frontend
npm run dev
```

---

## 🧪 Usage

1. Sign up / login
2. Enter a research query
3. Watch agents collaborate in real-time
4. View structured output
5. Save, export, or share results

---

## 📸 Screenshots

(Add these — VERY IMPORTANT)

* Dashboard UI
* Agent chat view
* Research output
* History page

---

## 🌐 Demo

(Add deployed link here if available)

---

## 🎯 Use Cases

* Academic research assistance
* Market research automation
* Content generation workflows
* AI-powered knowledge systems

---

## 📈 Future Enhancements

* Memory-based agents
* Parallel agent execution
* Vector database integration
* Plugin/tool integration
* Multi-user collaboration

---

## 🤝 Contribution

Contributions are welcome!
Feel free to fork, improve, and submit pull requests.

---

## 📜 License

MIT License

---

## 📫 Contact

**Rangu Suchandra**
📧 [bunnyrangu29@gmail.com](mailto:bunnyrangu29@gmail.com)
🔗 GitHub: https://github.com/BUNNY-RANGU

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
