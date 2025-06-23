from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Meal(Base):
    __tablename__ = 'meals'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    emoji = Column(String)
    price_level = Column(String)  # رخيص, متوسط, فاخر
    cuisine = Column(String)      # سعودي, شامي, ...
    dietary_type = Column(String) # عادي, نباتي, ...
    location = Column(String)
    rating = Column(Float)
    picked_count = Column(Integer, default=0) 