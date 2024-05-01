from pydantic import BaseModel

class IoTDeviceBase(BaseModel):
    power: bool
    geolocation: str
    admin_id: str

class IoTDeviceCreate(IoTDeviceBase):
    pass

    class Config:
        orm_mode = True
