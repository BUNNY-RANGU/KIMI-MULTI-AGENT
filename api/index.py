"""
Final, perfect Vercel FastAPI backend for ResearchSquad AI
"""
import os
import sys

# CRITICAL: Ensure root directory is in sys.path for modules to be found
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
from io import BytesIO
from fastapi.responses import StreamingResponse
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

# Root level imports
from database import save_research, get_all_history, get_research_by_id, create_user, get_user_by_email
from agents.researcher import ResearcherAgent
from agents.analyst import AnalystAgent
from agents.writer import WriterAgent
from agents.editor import EditorAgent

app = FastAPI(title="ResearchSquad AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "environment": "vercel"}

@app.get("/export/{research_id}")
async def export_pdf(research_id: int):
    research = get_research_by_id(research_id)
    if not research: return {"error": "Not found"}
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = [Paragraph(f"Research: {research.topic}", styles['Title']), Spacer(1, 12)]
    story.append(Paragraph(f"Type: {research.content_type} | Date: {research.created_at}", styles['Normal']))
    story.append(Paragraph(research.final_content.replace('\n', '<br/>'), styles['BodyText']))
    doc.build(story)
    buffer.seek(0)
    return StreamingResponse(buffer, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=research.pdf"})

class ResearchRequest(BaseModel):
    topic: str
    content_type: str = "blog"

@app.post("/research")
async def research(request: ResearchRequest):
    researcher, analyst, writer, editor = ResearcherAgent(), AnalystAgent(), WriterAgent(), EditorAgent()
    sources = researcher.search(request.topic)
    if not sources: return {"error": "Research failed"}
    brief = researcher.summarize(sources, request.topic)
    analysis = analyst.analyze(brief, request.topic)
    draft = writer.write(brief, analysis, request.topic, request.content_type)
    final = editor.edit(draft, request.topic, request.content_type)
    research_id = save_research(request.topic, request.content_type, final)
    return {"id": research_id, "topic": request.topic, "final": final}

@app.get("/history")
async def history():
    items = get_all_history()
    return {"history": [{"id": i.id, "topic": i.topic, "content_type": i.content_type, "created_at": i.created_at.strftime("%Y-%m-%d %H:%M")} for i in items]}

@app.get("/history/{research_id}")
async def get_history_item(research_id: int):
    item = get_research_by_id(research_id)
    if not item: return {"error": "Not found"}
    return {"id": item.id, "topic": item.topic, "final_content": item.final_content, "created_at": item.created_at.strftime("%Y-%m-%d %H:%M")}

@app.post("/signup")
async def signup(email: str, password: str):
    if get_user_by_email(email): return {"success": False, "error": "Exists"}
    user_id = create_user(email, hashlib.sha256(password.encode()).hexdigest())
    return {"success": True} if user_id else {"success": False}

@app.post("/login")
async def login(email: str, password: str):
    user = get_user_by_email(email)
    if user and user.password_hash == hashlib.sha256(password.encode()).hexdigest():
        return {"success": True, "user_id": user.id, "email": user.email}
    return {"success": False, "error": "Invalid"}
