@echo off
echo 🚀 Starting ResearchSquad AI (Local Development)
echo ------------------------------------------------

:: Start Backend
start cmd /k "echo 🐍 Starting FastAPI Backend... && uvicorn api:app --reload --port 8000"

:: Start Frontend
start cmd /k "echo ⚛️ Starting Next.js Frontend... && cd frontend && npm run dev"

echo ------------------------------------------------
echo ✅ Both servers are starting in separate windows.
echo 🌐 Backend: http://127.0.0.1:8000
echo 🌐 Frontend: http://localhost:3000
echo ------------------------------------------------
pause
