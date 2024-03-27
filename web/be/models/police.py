from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
from models.admin import Admin

class Police(Admin):
    __tablename__ = 'police'
    __mapper_args__ = {'polymorphic_identity': 'police'}

    id = Column(String(50), ForeignKey('admin.id'), primary_key=True)
    certification = Column(ARRAY(String(255)))
    work_history = Column(ARRAY(String(255)))
    joined = Column(Date, nullable=False)
    work_at = Column(String(255), nullable=False)
