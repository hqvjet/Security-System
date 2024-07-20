from datetime import date
from typing import List
from pydantic import BaseModel, EmailStr

class AdminBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    age: int
    address: str
    phone: str
    cccd: str
    agree: bool
    description: str = None
    role: str = 'admin'
    avatar: str = None

class AdminCreate(AdminBase):
    password: str
    confirmPassword: str

class AdminUpdate(AdminBase):
    password: str = None

class Login(BaseModel):
    username: str
    password: str

class AdminSchema(AdminBase):
    username: str
    class Config:
        orm_mode = True
