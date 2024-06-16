from pydantic import BaseModel

class Point(BaseModel):
    latitude: float
    longitude: float

class IoTDeviceBase(BaseModel):
    id: str
    power: bool
    geolocation: Point
    admin_id: str

class IoTDeviceCreate(IoTDeviceBase):
    id: str
    power: bool
    geolocation: Point
    admin_id: str

class IoTDevice(IoTDeviceBase):
    class Config:
        orm_mode = True
