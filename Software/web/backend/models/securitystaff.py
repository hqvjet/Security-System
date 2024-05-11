from sqlalchemy import Column, String, Date, Text, Integer
from sqlalchemy.orm import relationship
from db import Base

class SecurityStaff(Base):
    __tablename__ = 'security_staff'

    id = Column(String(50), primary_key=True)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    description = Column(Text)
    role = Column(String(50), nullable=False)
    joined = Column(Date, nullable=False)
    work_at = Column(String(255), nullable=False)
