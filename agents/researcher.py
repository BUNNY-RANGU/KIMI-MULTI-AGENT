"""
Researcher Agent - Finds and summarizes information
"""

from langchain_groq import ChatGroq
from ddgs import DDGS

class ResearcherAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama-3.3-70b-versatile")
        self.name = "Researcher"
    
    def search(self, query):
        """Search web for sources"""
        print(f"\n[{self.name}] 🔍 Searching: {query}")
        
        try:
            with DDGS() as ddgs:
                results = ddgs.text(query, max_results=3)
                
                sources = []
                for r in results:
                    sources.append({
                        'title': r['title'],
                        'link': r['href'],
                        'summary': r['body'][:200]
                    })
                
                print(f"[{self.name}] ✅ Found {len(sources)} sources")
                return sources
        
        except Exception as e:
            print(f"[{self.name}] ❌ Search failed: {e}")
            return []
    
    def summarize(self, sources, topic):
        """Summarize findings into brief"""
        print(f"[{self.name}] 📝 Summarizing...")
        
        sources_text = "\n\n".join([
            f"Source: {s['title']}\n{s['summary']}" 
            for s in sources
        ])
        
        prompt = f"""Research: {topic}

Sources:
{sources_text}

Create a research brief:
- Key facts (bullet points)
- Main trends
- Important data points"""
        
        return self.llm.invoke(prompt).content