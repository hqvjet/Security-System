from pydantic import BaseModel

class IoTDeviceBase(BaseModel):
    id: str
    power: bool
    geolocation: str

class IoTDeviceCreate(IoTDeviceBase):
    id: str
    power: bool
    geolocation: str

class IoTDevice(IoTDeviceBase):
    class Config:
        from_attributes = True
