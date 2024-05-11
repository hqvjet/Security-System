from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from db import Base

class Admin(Base):
    __tablename__ = 'admin'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    description = Column(Text)
    role = Column(String(50))
    cccd = Column(String(20), nullable=False)
    avatar = Column(String(255))

    __mapper_args__ = {
        'polymorphic_identity': 'admin',
        'concrete': True 
    }

    def __repr__(self):
        return f"Admin(id='{self.id}', username='{self.username}', full_name='{self.full_name}', email='{self.email}')"
