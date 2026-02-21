
"""
SQLite database - Saves research history
"""

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class ResearchHistory(Base):
    __tablename__ = 'research_history'
    
    id = Column(Integer, primary_key=True)
    topic = Column(String(500))
    content_type = Column(String(50))
    final_content = Column(Text)
    created_at = Column(DateTime, default=datetime.now)

# Create the database file
engine = create_engine('sqlite:///research.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

def save_research(topic, content_type, final_content):
    """Save research to database"""
    session = Session()
    research = ResearchHistory(
        topic=topic,
        content_type=content_type,
        final_content=final_content
    )
    session.add(research)
    session.commit()
    research_id = research.id
    session.close()
    return research_id

def get_all_history():
    """Get all past research"""
    session = Session()
    results = session.query(ResearchHistory).order_by(ResearchHistory.created_at.desc()).all()
    session.close()
    return results

def get_research_by_id(research_id):
    """Get one specific research"""
    session = Session()
    result = session.query(ResearchHistory).filter_by(id=research_id).first()
    session.close()
    return result