"""
FastAPI backend for ResearchSquad AI
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
# Add this line with other imports
from database import save_research, get_all_history, get_research_by_id
from agents.researcher import ResearcherAgent
from agents.analyst import AnalystAgent
from agents.writer import WriterAgent
from agents.editor import EditorAgent
from database import create_user, get_user_by_email





from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from fastapi.responses import StreamingResponse

app = FastAPI(title="ResearchSquad AI API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/export/{research_id}")
async def export_pdf(research_id: int):
    """Export research to PDF"""
    research = get_research_by_id(research_id)
    
    if not research:
        return {"error": "Not found"}
    
    # Create PDF
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Build content
    story = []
    
    # Title
    story.append(Paragraph(f"Research: {research.topic}", styles['Title']))
    story.append(Spacer(1, 12))
    
    # Meta
    story.append(Paragraph(f"Type: {research.content_type}", styles['Normal']))
    story.append(Paragraph(f"Date: {research.created_at}", styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Content
    story.append(Paragraph(research.final_content.replace('\n', '<br/>'), styles['BodyText']))
    
    doc.build(story)
    
    buffer.seek(0)
    
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=research_{research_id}.pdf"}
    )

# Password hashing - Simple SHA256
def hash_password(password: str) -> str:
    """Simple SHA256 hash"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify SHA256 hash"""
    return hash_password(plain_password) == hashed_password

class ResearchRequest(BaseModel):
    topic: str
    content_type: str = "blog"

@app.post("/research")
async def research(request: ResearchRequest):
    """Run full research pipeline"""
    
    # Initialize agents
    researcher = ResearcherAgent()
    analyst = AnalystAgent()
    writer = WriterAgent()
    editor = EditorAgent()
    
    # Step 1: Research
    sources = researcher.search(request.topic)
    if not sources:
        return {"error": "Research failed"}
    
    brief = researcher.summarize(sources, request.topic)
    
    # Step 2: Analyze
    analysis = analyst.analyze(brief, request.topic)
    
    # Step 3: Write
    draft = writer.write(brief, analysis, request.topic, request.content_type)
    
    # Step 4: Edit
    final = editor.edit(draft, request.topic, request.content_type)
        # Save to database
    research_id = save_research(request.topic, request.content_type, final)
    
    return {
        "topic": request.topic,
        "content_type": request.content_type,
        "sources": sources,
        "brief": brief,
        "analysis": analysis,
        "draft": draft,
        "final": final
    }

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/history")
async def history():
    """Get all research history"""
    items = get_all_history()
    return {
        "history": [
            {
                "id": item.id,
                "topic": item.topic,
                "content_type": item.content_type,
                "created_at": item.created_at.strftime("%Y-%m-%d %H:%M")
            }
            for item in items
        ]
    }

@app.get("/history/{research_id}")
async def get_history_item(research_id: int):
    """Get one research by ID"""
    item = get_research_by_id(research_id)
    if not item:
        return {"error": "Not found"}
    return {
        "id": item.id,
        "topic": item.topic,
        "content_type": item.content_type,
        "final_content": item.final_content,
        "created_at": item.created_at.strftime("%Y-%m-%d %H:%M")
    }


@app.post("/signup")
async def signup(email: str, password: str):
    """Create new user"""
    # Check if user already exists
    existing_user = get_user_by_email(email)
    if existing_user:
        return {"success": False, "error": "User already exists"}
    
    # Hash password
    hashed = hash_password(password)
    
    # Save to database
    user_id = create_user(email, hashed)
    
    if user_id:
        return {"success": True, "message": "User created successfully"}
    else:
        return {"success": False, "error": "Failed to create user"}

@app.post("/login")
async def login(email: str, password: str):
    """Login user"""
    user = get_user_by_email(email)
    if not user:
        return {"success": False, "error": "User not found"}
    
    if verify_password(password, user.password_hash):
        return {"success": True, "user_id": user.id, "email": user.email}
    else:
        return {"success": False, "error": "Invalid password"}

# Run with: uvicorn api:app --reload --port 8000