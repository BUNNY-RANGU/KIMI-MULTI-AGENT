@echo off
echo 🚀 Starting ResearchSquad AI (Ready for Development)
echo ------------------------------------------------

:: Try to find and activate Virtual Environment
if exist .venv\Scripts\activate (
    echo 🐍 Activating .venv...
    call .venv\Scripts\activate
) else if exist venv\Scripts\activate (
    echo 🐍 Activating venv...
    call venv\Scripts\activate
) else (
    echo ⚠️ No virtual environment found. Running with global Python.
)

:: Start Backend
start cmd /k "echo 🐍 Starting FastAPI Backend... && uvicorn api:app --reload --port 8000"

:: Start Frontend
start cmd /k "echo ⚛️ Starting Next.js Frontend... && cd frontend && npm run dev"

echo ------------------------------------------------
echo ✅ Both servers are starting in separate windows.
echo ------------------------------------------------
echo 🌐 Frontend: http://localhost:3000
echo 🌐 Backend: http://127.0.0.1:8000
echo ------------------------------------------------
echo 💡 Tip: Keep those windows open while working!
echo ------------------------------------------------
pause
