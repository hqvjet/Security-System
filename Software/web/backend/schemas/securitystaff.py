from datetime import date
from pydantic import BaseModel

class SecurityStaffBase(BaseModel):
    joined: date
    work_at: str

class SecurityStaffCreate(SecurityStaffBase):
    pass

class SecurityStaffUpdate(SecurityStaffBase):
    pass

    class Config:
        orm_mode = True
