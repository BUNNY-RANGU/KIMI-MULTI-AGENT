"""
ResearchSquad AI - Day 2
Two agents: Researcher + Analyst
"""

import os
from dotenv import load_dotenv

from agents.researcher import ResearcherAgent
from agents.analyst import AnalystAgent

load_dotenv()

def main():
    print("=" * 60)
    print("🚀 ResearchSquad AI - Day 2 (Multi-Agent)")
    print("=" * 60)
    
    if not os.getenv("GROQ_API_KEY"):
        print("❌ Add GROQ_API_KEY to .env file")
        return
    
    # Create agents
    researcher = ResearcherAgent()
    analyst = AnalystAgent()
    
    # Get topic
    topic = input("\n🔍 Research topic: ")
    
    print(f"\n🎯 Starting: {topic}")
    print("-" * 60)
    
    # Agent 1: Research
    sources = researcher.search(topic)
    
    if not sources:
        print("❌ Research failed. Try different topic.")
        return
    
    brief = researcher.summarize(sources, topic)
    
    print(f"\n📋 RESEARCH BRIEF:")
    print(brief)
    
    # Agent 2: Analyze
    analysis = analyst.analyze(brief, topic)
    
    print(f"\n📊 ANALYST REPORT:")
    print(analysis)
    
    print("-" * 60)
    print("✅ Day 2 Complete!")

if __name__ == "__main__":
    main()