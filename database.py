"""
SQLite database - Users + Research History
"""

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(200), unique=True, nullable=False)
    password_hash = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    
    # Relationship to research
    researches = relationship("ResearchHistory", back_populates="user")

class ResearchHistory(Base):
    __tablename__ = 'research_history'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)  # Can be null for now
    topic = Column(String(500))
    content_type = Column(String(50))
    final_content = Column(Text)
    created_at = Column(DateTime, default=datetime.now)
    
    # Relationship to user
    user = relationship("User", back_populates="researches")

# Create database
engine = create_engine('sqlite:///research.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# User functions
def create_user(email, password_hash):
    """Create new user"""
    session = Session()
    try:
        user = User(email=email, password_hash=password_hash)
        session.add(user)
        session.commit()
        user_id = user.id
        session.close()
        return user_id
    except:
        session.close()
        return None

def get_user_by_email(email):
    """Get user by email"""
    session = Session()
    user = session.query(User).filter_by(email=email).first()
    session.close()
    return user

# Research functions (updated)
def save_research(topic, content_type, final_content, user_id=None):
    """Save research to database"""
    session = Session()
    research = ResearchHistory(
        user_id=user_id,
        topic=topic,
        content_type=content_type,
        final_content=final_content
    )
    session.add(research)
    session.commit()
    research_id = research.id
    session.close()
    return research_id

def get_all_history(user_id=None):
    """Get all past research"""
    session = Session()
    if user_id:
        results = session.query(ResearchHistory).filter_by(user_id=user_id).order_by(ResearchHistory.created_at.desc()).all()
    else:
        results = session.query(ResearchHistory).order_by(ResearchHistory.created_at.desc()).all()
    session.close()
    return results

def get_research_by_id(research_id, user_id=None):
    """Get one specific research"""
    session = Session()
    query = session.query(ResearchHistory).filter_by(id=research_id)
    if user_id:
        query = query.filter_by(user_id=user_id)
    result = query.first()
    session.close()
    return result