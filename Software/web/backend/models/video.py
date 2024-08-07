from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Video(Base):
    __tablename__ = 'video'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(Date, nullable=False)
    iot_id = Column(String(50), ForeignKey('iot_device.id'))
