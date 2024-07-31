from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr

class PoliceBase(BaseModel):
    id: str
    username: str
    full_name: str
    email: EmailStr
    age: int
    address: str
    phone: str
    joined: date = None
    work_at: str = None

    certification: str
    work_history: str

class PoliceCreate(PoliceBase):
    password: str
    cccd: str
    role: str
    description: str = None
    avatar: str = None

class PoliceUpdate(PoliceBase):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    age: Optional[int] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    cccd: Optional[str] = None
    geolocation: Optional[str] = None
    description: Optional[str] = None
    work_at: Optional[str] = None
    joined: Optional[date] = None
    certification: Optional[str] = None
    work_history: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None

class Police(PoliceBase):
    class Config:
        from_attributes = True

class GeolocationUpdate(BaseModel):
    geolocation: str