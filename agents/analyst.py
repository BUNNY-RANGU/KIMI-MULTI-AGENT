"""
Analyst Agent - Extracts insights and checks quality
"""

from langchain_groq import ChatGroq

class AnalystAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama-3.3-70b-versatile")
        self.name = "Analyst"
    
    def analyze(self, research_brief, topic):
        """Analyze research and extract insights"""
        print(f"\n[{self.name}] 🔍 Analyzing research...")
        
        prompt = f"""Topic: {topic}

Research Brief:
{research_brief}

Your analysis:
1. What are the 3 most important insights?
2. Any potential biases or gaps?
3. Confidence level (High/Medium/Low)?
4. What should be researched next?

Format clearly with headers."""
        
        analysis = self.llm.invoke(prompt).content
        print(f"[{self.name}] ✅ Analysis complete")
        return analysis