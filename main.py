"""
ResearchSquad AI - Day 4
Four agents: Researcher → Analyst → Writer → Editor
"""

import os
from dotenv import load_dotenv

from agents.researcher import ResearcherAgent
from agents.analyst import AnalystAgent
from agents.writer import WriterAgent
from agents.editor import EditorAgent

load_dotenv()

def main():
    print("=" * 60)
    print("🚀 ResearchSquad AI - Day 4 (Full Team)")
    print("=" * 60)
    
    if not os.getenv("GROQ_API_KEY"):
        print("❌ Add GROQ_API_KEY to .env file")
        return
    
    # Create all 4 agents
    researcher = ResearcherAgent()
    analyst = AnalystAgent()
    writer = WriterAgent()
    editor = EditorAgent()
    
    # Get inputs
    topic = input("\n🔍 Research topic: ")
    print("\nTypes: blog, linkedin, report, thread")
    content_type = input("📝 Content type [blog]: ").strip() or "blog"
    
    print(f"\n🎯 Mission: {topic} → {content_type}")
    print("-" * 60)
    
    # Agent 1: Research
    sources = researcher.search(topic)
    if not sources:
        print("❌ Research failed.")
        return
    
    brief = researcher.summarize(sources, topic)
    print(f"\n✅ RESEARCH DONE")
    
    # Agent 2: Analyze
    analysis = analyst.analyze(brief, topic)
    print(f"✅ ANALYSIS DONE")
    
    # Agent 3: Write
    draft = writer.write(brief, analysis, topic, content_type)
    print(f"✅ WRITING DONE")
    
    # Agent 4: Edit
    final = editor.edit(draft, topic, content_type)
    fact_check = editor.fact_check(draft, sources)
    
    # Output
    print(f"\n{'=' * 60}")
    print(f"📰 PUBLICATION-READY {content_type.upper()}")
    print(f"{'=' * 60}")
    print(final)
    
    print(f"\n{'=' * 60}")
    print(f"🔍 FACT-CHECK NOTES")
    print(f"{'=' * 60}")
    print(fact_check)
    
    print(f"\n{'=' * 60}")
    print("✅ Day 4 Complete! Full pipeline working.")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()