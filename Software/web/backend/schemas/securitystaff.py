from datetime import date
from pydantic import BaseModel, EmailStr

class SecurityStaffBase(BaseModel):
    id : str
    username: str
    email: EmailStr
    full_name: str
    age: int
    address: str
    phone: str
    cccd: str
    description: str = None
    role: str 
    avatar: str = None
    joined: date
    work_at: str

class SecurityStaffCreate(SecurityStaffBase):
    password: str

class SecurityStaffUpdate(SecurityStaffBase):
    pass

class SecurityStaff(SecurityStaffBase):
    pass
    class Config:
        orm_mode = True    