from sqlalchemy import Column, String, Date, Text, Integer
from sqlalchemy.orm import relationship
from db import Base

class SecurityStaff(Base):
    __tablename__ = 'security_staff'

    id = Column(String(50), primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    cccd = Column(String(20), nullable=False)
    description = Column(Text)
    role = Column(String(50), nullable=False)
    joined = Column(Date)
    work_at = Column(String(255), nullable=False)
    avatar = Column(String(255))

    missions = relationship("Mission", back_populates="security_staff")