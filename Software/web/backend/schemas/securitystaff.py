from datetime import date
from typing import Optional
from pydantic import BaseModel, EmailStr

class SecurityStaffBase(BaseModel):
    id: str
    username: str
    full_name: str
    email: EmailStr
    age: int
    address: str
    phone: str
    description: Optional[str] = None
    joined: Optional[date] = None
    work_at: Optional[str] = None

class SecurityStaffCreate(SecurityStaffBase):
    password: str
    cccd: str
    role: str
    avatar: Optional[str] = None

class SecurityStaffUpdate(SecurityStaffBase):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    age: Optional[int] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    cccd: Optional[str] = None
    description: Optional[str] = None
    joined: Optional[date] = None
    work_at: Optional[str] = None
    role: Optional[str] = None
    avatar: Optional[str] = None

class SecurityStaff(SecurityStaffBase):
    class Config:
        orm_mode = True
 

class Login(BaseModel):
    username: str
    password: str