from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr

class PoliceBase(BaseModel):
    id: str
    username: str
    email: EmailStr
    password: str
    full_name: str
    age: int
    address: str
    phone: str
    cccd: str
    description: str = None
    role: str
    avatar: str = None
    certification: str
    work_history: str
    joined: date = None
    work_at: str = None

class PoliceCreate(PoliceBase):
    password: str

class PoliceUpdate(PoliceBase):
    pass

class Police(PoliceBase):
    class Config:
        orm_mode = True
