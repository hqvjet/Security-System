from pydantic import BaseModel, EmailStr

class AdminBase(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirmPassword: str
    full_name: str
    age: int
    address: str
    phone: str
    cccd: str
    agree: bool
    description: str = None
    role: str = "admin"
    avatar: str = None

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(AdminBase):
    password: str = None

    class Config:
        orm_mode = True
