from pydantic import BaseModel

class IoTDeviceBase(BaseModel):
    id: str
    power: bool
    geolocation: str
    username_admin: str

class IoTDeviceCreate(IoTDeviceBase):
    id: str
    power: bool
    geolocation: str
    username_admin: str

class IoTDevice(IoTDeviceBase):
    class Config:
        orm_mode = True
