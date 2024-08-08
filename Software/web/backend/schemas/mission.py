from pydantic import BaseModel, Json
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class MissionBase(BaseModel):
    id: Optional[int] = None
    iot_device_id: Optional[str] = None
    security_staff_id: Optional[str] = None
    assigned_police_ids: List[str]
    location: Optional[str] = None
    state: Optional[str] = None

class MissionCreate(MissionBase):
    pass

class MissionUpdate(BaseModel):
    location: Optional[str] = None
    assigned_police_ids: List[int] = None
    state: str = None

class Mission(MissionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
