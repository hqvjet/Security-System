from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from db import Base

class IoT_Device(Base):
    __tablename__ = 'IoT_Device'

    ID = Column(String(50), primary_key=True)
    power = Column(Boolean, nullable=False)
    geolocation = Column(Geometry('POINT'), nullable=False)
    admin_id = Column(String(50), ForeignKey('Admin.ID'))

    admin = relationship("Admin", back_populates="iot_devices")
