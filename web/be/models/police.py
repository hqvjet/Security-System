from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
from admin import Admin

class Police(Admin):
    __tablename__ = 'Police'

    ID = Column(String(50), ForeignKey('Admin.ID'), primary_key=True)
    certification = Column(ARRAY(String(255)))
    work_history = Column(ARRAY(String(255)))
    joined = Column(Date, nullable=False)
    work_at = Column(String(255), nullable=False)

    admin = relationship("Admin", back_populates="police")
