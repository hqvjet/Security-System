from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from db import Base

class Admin(Base):
    __tablename__ = 'Admin'

    ID = Column(String(50), primary_key=True)
    access_key = Column(String(100), nullable=False)
    username = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    full_name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    email = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=False)
    description = Column(Text)
    role = Column(String(50), nullable=False)
    CCCD = Column(String(20), nullable=False)
    avatar = Column(String(255))

    police = relationship("Police", uselist=False, back_populates="admin")
    security_staff = relationship("Security_Staff", uselist=False, back_populates="admin")
    iot_devices = relationship("IoT_Device", back_populates="admin")
