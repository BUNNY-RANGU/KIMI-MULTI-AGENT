"""
FastAPI backend for ResearchSquad AI
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Add this line with other imports
from database import save_research, get_all_history, get_research_by_id
from agents.researcher import ResearcherAgent
from agents.analyst import AnalystAgent
from agents.writer import WriterAgent
from agents.editor import EditorAgent

app = FastAPI(title="ResearchSquad AI API")

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Run with: uvicorn api:app --reload --port 8000