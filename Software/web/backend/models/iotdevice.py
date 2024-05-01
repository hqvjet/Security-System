from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from geoalchemy2 import Geometry
from db import Base

class IoTDevice(Base):
    __tablename__ = 'iot_device'

    id = Column(String(50), primary_key=True)
    power = Column(Boolean, nullable=False)
    geolocation = Column(Geometry('POINT'), nullable=False)
    admin_id = Column(String(50), ForeignKey('admin.id'))
