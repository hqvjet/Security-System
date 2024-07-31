from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship
from db import Base

class IoTDevice(Base):
    __tablename__ = 'iot_device'

    id = Column(String(50), primary_key=True, index=True)
    power = Column(Boolean, nullable=False)
    geolocation = Column(String(50), nullable=False)
    
    missions = relationship('Mission', back_populates='iot_device')
