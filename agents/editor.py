"""
Editor Agent - Final polish: SEO, grammar, readability
"""

from langchain_groq import ChatGroq

class EditorAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama-3.3-70b-versatile")
        self.name = "Editor"
    
    def edit(self, content, topic, content_type="blog"):
        """Polish content for publication"""
        print(f"\n[{self.name}] 🔧 Editing for {content_type}...")
        
        prompt = f"""Content to edit:
{content}

Your job as Editor:
1. Fix grammar and spelling errors
2. Improve readability and flow
3. Add SEO keywords naturally
4. Optimize headline for clicks
5. Ensure consistent tone
6. Add meta description (for blogs)

Return:
- **SEO Title:** (optimized headline)
- **Meta Description:** (155 chars for search)
- **Keywords:** (5 relevant keywords)
- **Edited Content:** (polished full text)
- **Improvements Made:** (bullet list of changes)"""
        
        edited = self.llm.invoke(prompt).content
        print(f"[{self.name}] ✅ Content polished")
        return edited
    
    def fact_check(self, content, sources):
        """Quick fact-check against sources"""
        print(f"[{self.name}] 🔍 Fact-checking...")
        
        sources_text = "\n".join([f"- {s['title']}: {s['link']}" for s in sources])
        
        prompt = f"""Content:
{content[:1000]}...

Sources:
{sources_text}

Flag any claims that don't match sources or need verification.
List specific sentences and suggested fixes."""
        
        check = self.llm.invoke(prompt).content
        print(f"[{self.name}] ✅ Fact-check complete")
        return check