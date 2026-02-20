"""
Your first AI agent: The Researcher
"""

import sys
import os

# Fix path issues
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.append(parent_dir)

from crewai import Agent
from crewai import LLM
from dotenv import load_dotenv

# Load API key
load_dotenv()

def create_researcher():
    """
    Creates a research agent using FREE Groq API
    """
    
    # Connect to Groq using crewai's LLM class
    # In newer crewai versions, use the LLM class with explicit provider
    llm = LLM(
        model="groq/llama-3.1-70b-versatile",
        temperature=0.7,
        max_tokens=2048
    )
    
    # Create the agent - NO TOOLS for now
    researcher = Agent(
        role='Expert Research Analyst',
        goal='Find accurate information and summarize 3 key insights',
        backstory="""You are a senior research analyst with 10 years experience.
        You dig deep, verify facts, and explain simply.
        You ALWAYS cite sources and admit uncertainty.""",
        
        llm=llm,
        # tools=[]  # Removed for now - add back after we fix version
        verbose=True,
        allow_delegation=False,
        memory=True
    )
    
    return researcher
