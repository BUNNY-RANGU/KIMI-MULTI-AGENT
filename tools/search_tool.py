"""
Web search tool - Works with ALL CrewAI versions
"""

from duckduckgo_search import DDGS

def web_search(query: str) -> str:
    """
    Search the web for any topic. Returns top 5 results.
    """
    print(f"🔍 Searching: {query}")
    
    try:
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=5)
            
            formatted = []
            for i, result in enumerate(results, 1):
                text = result['body'][:150] if len(result['body']) > 150 else result['body']
                formatted.append(f"{i}. {result['title']}\n   Link: {result['href']}\n   Summary: {text}...")
            
            return "\n\n".join(formatted)
    
    except Exception as e:
        return f"Search failed: {str(e)}"