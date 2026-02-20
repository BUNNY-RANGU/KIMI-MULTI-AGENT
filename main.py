"""
ResearchSquad AI - Day 1
Simple research assistant using Groq (FREE)
"""

import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from ddgs import DDGS  # FIXED: Updated import

# Load API key
load_dotenv()

def search_web(query):
    """Search web for information"""
    print(f"🔍 Searching: {query}")
    
    try:
        with DDGS() as ddgs:
            results = ddgs.text(query, max_results=3)
            
            output = []
            for i, r in enumerate(results, 1):
                text = r['body'][:150] + "..." if len(r['body']) > 150 else r['body']
                output.append(f"{i}. {r['title']}\n   Link: {r['href']}\n   {text}")
            
            return "\n\n".join(output)
    except Exception as e:
        return f"Search failed: {e}"

def main():
    print("=" * 50)
    print("🚀 ResearchSquad AI - Day 1")
    print("=" * 50)
    
    # Check API key
    if not os.getenv("GROQ_API_KEY"):
        print("❌ ERROR: Add GROQ_API_KEY to .env file")
        return
    
    # Setup AI (FREE Groq)
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",       
        temperature=0.7
    )
    
    # Get topic from user
    topic = input("\n🔍 What to research? ")
    
    # Step 1: Search
    print("\n⏳ Step 1: Searching web...")
    search_results = search_web(topic)
    print("✅ Search complete\n")
    
    # Step 2: Analyze with AI
    print("⏳ Step 2: AI analyzing...")
    
    prompt = f"""Research topic: "{topic}"

Search results:
{search_results}

Create a research summary:
## Overview (2 sentences)
## 3 Key Insights (numbered)
## Sources (list URLs)"""
    
    # FIXED: Use invoke() instead of predict()
    response = llm.invoke(prompt)
    analysis = response.content
    
    # Show results
    print("\n" + "=" * 50)
    print("📊 RESEARCH RESULTS")
    print("=" * 50)
    print(analysis)
    print("=" * 50)

if __name__ == "__main__":
    main()