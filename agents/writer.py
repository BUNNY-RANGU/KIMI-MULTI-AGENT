"""
Writer Agent - Creates publishable content from research
"""

from langchain_groq import ChatGroq

class WriterAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama-3.3-70b-versatile")
        self.name = "Writer"
    
    def write(self, research_brief, analysis, topic, content_type="blog"):
        """Create content from research"""
        print(f"\n[{self.name}] ✍️ Writing {content_type}...")
        
        formats = {
            "blog": "engaging blog post (800 words, conversational)",
            "linkedin": "professional LinkedIn post (300 words, punchy)",
            "report": "formal business report (professional tone)",
            "thread": "Twitter/X thread (5-7 tweets, hook-heavy)"
        }
        
        format_desc = formats.get(content_type, "blog post")
        
        prompt = f"""Topic: {topic}

Research Brief:
{research_brief}

Analyst Insights:
{analysis}

Create a {format_desc}.

Requirements:
- Catchy headline/title
- Clear structure with headers
- Include key insights from research
- Cite sources naturally
- Strong conclusion with call-to-action
- Tone appropriate for {content_type}"""
        
        content = self.llm.invoke(prompt).content
        print(f"[{self.name}] ✅ Content created")
        return content