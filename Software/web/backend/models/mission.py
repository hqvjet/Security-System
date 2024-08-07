from sqlalchemy import Column, String, UUID, ARRAY, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db import Base
import uuid

class Mission(Base):
    __tablename__ = 'mission'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    security_staff_id = Column(String(50), ForeignKey('security_staff.id'), nullable=False)
    iot_device_id = Column(String(50), ForeignKey('iot_device.id'), nullable=False)
    location = Column(JSON, nullable=False) 
    assigned_police_ids = Column(ARRAY(String(50)), nullable=False)
    state = Column(String(50), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    iot_device = relationship('IoTDevice', back_populates='missions')
    security_staff = relationship("SecurityStaff", back_populates="missions")
