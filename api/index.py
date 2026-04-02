# Vercel entry point for FastAPI
import os
import sys

# Add root directory to sys.path to find database.py and other modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the existing app from api.py
from api import app

# This is what Vercel looks for
handler = app
