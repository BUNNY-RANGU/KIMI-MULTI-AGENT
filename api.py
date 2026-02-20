"""
FastAPI backend for ResearchSquad AI
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# Run with: uvicorn api:app --reload --port 8000