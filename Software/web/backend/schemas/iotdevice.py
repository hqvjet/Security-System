from typing import Optional
from pydantic import BaseModel

class IoTDeviceBase(BaseModel):
    id: Optional[int] = None
    power: bool
    geolocation: Optional[str] = None

class IoTDeviceCreate(IoTDeviceBase):
    id: int
    power: bool
    geolocation: str

class IoTDevice(IoTDeviceBase):
    class Config:
        from_attributes = True
