from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Video(Base):
    __tablename__ = 'video'

    id = Column(String(50), primary_key=True)
    created_at = Column(Date, nullable=False)
    security_staff_id = Column(String(50), ForeignKey('security_staff.id'))
