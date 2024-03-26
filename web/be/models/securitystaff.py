from sqlalchemy import Column, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from admin import Admin

class Security_Staff(Admin):
    __tablename__ = 'Security_Staff'

    ID = Column(String(50), ForeignKey('Admin.ID'), primary_key=True)
    joined = Column(Date, nullable=False)
    work_at = Column(String(255), nullable=False)

    admin = relationship("Admin", back_populates="security_staff")
    videos = relationship("Video", back_populates="security_staff")
