from sqlalchemy import Column, String, Date, Integer, String, Text
from db import Base

class Police(Base):
    __tablename__ = 'police'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    cccd = Column(String(20), nullable=False)
    geolocation = Column(String(100))
    description = Column(Text)
    role = Column(String(50), nullable=False)
    joined = Column(Date)
    work_at = Column(String(255), nullable=False)
    avatar = Column(String(255))

    certification = Column(String(255))
    work_history = Column(String(255))
