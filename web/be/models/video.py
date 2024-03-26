from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Video(Base):
    __tablename__ = 'Video'

    ID = Column(String(50), primary_key=True)
    created_at = Column(Date, nullable=False)
    security_staff_id = Column(String(50), ForeignKey('Security_Staff.ID'))

    security_staff = relationship("Security_Staff", back_populates="videos")
