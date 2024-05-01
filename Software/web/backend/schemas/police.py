from datetime import date
from typing import List
from pydantic import BaseModel

class PoliceBase(BaseModel):
    certification: List[str]
    work_history: List[str]
    joined: date
    work_at: str

class PoliceCreate(PoliceBase):
    pass

class PoliceUpdate(PoliceBase):
    pass

    class Config:
        orm_mode = True
