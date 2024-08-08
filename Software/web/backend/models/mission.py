from sqlalchemy import Column, Integer, ForeignKey, ARRAY, TIMESTAMP, JSON, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db import Base

class Mission(Base):
    __tablename__ = 'mission'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    security_staff_id = Column(Integer, ForeignKey('security_staff.id'), nullable=False)
    iot_device_id = Column(Integer, ForeignKey('iot_device.id'), nullable=False)
    location = Column(String(255), nullable=False) 
    assigned_police_ids = Column(String, nullable=False)
    state = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    iot_device = relationship('IoTDevice', back_populates='missions')
    security_staff = relationship("SecurityStaff", back_populates="missions")
