from pydantic import BaseModel, Json
from typing import List
from uuid import UUID
from datetime import datetime

class MissionBase(BaseModel):
    security_staff_id: str
    iot_device_id: str
    location: Json
    assigned_police_ids: List[str]
    state: str

class MissionCreate(MissionBase):
    pass

class MissionUpdate(BaseModel):
    location: Json = None
    assigned_police_ids: List[str] = None
    state: str = None

class Mission(MissionBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
