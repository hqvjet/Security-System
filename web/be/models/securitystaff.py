from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from models.admin import Admin

class SecurityStaff(Admin):
    __tablename__ = 'security_staff'
    __mapper_args__ = {'polymorphic_identity': 'security_staff'}

    id = Column(String(50), ForeignKey('admin.id'), primary_key=True)
    joined = Column(Date, nullable=False)
    work_at = Column(String(255), nullable=False)
