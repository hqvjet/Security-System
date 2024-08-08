from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MissionBase(BaseModel):
    id: Optional[int] = None
    iot_device_id: Optional[int] = None
    security_staff_id: Optional[int] = None
    assigned_police_ids: Optional[str] = None
    location: Optional[str] = None
    state: Optional[str] = None

class MissionCreate(MissionBase):
    pass

class MissionUpdate(BaseModel):
    location: Optional[str] = None
    assigned_police_ids: List[str] = None
    state: Optional[str] = None

class Mission(MissionBase):
    id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
