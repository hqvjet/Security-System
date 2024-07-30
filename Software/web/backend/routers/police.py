# routers/police.py

from sqlalchemy import func
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import SessionLocal
from models.police import Police
from schemas.police import Police as PoliceSchema, PoliceUpdate
from models.mission import Mission
from schemas.mission import Mission as MissionSchemas, MissionUpdate

router = APIRouter(
    prefix='/api/v1/police',
    tags=['Police']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/get_list", response_model=List[PoliceSchema])
def get_police_list(db: Session = Depends(get_db)):
    police_list = db.query(Police).filter(Police.role == 'police').all()
    return police_list

@router.get("/get/{police_id}", response_model=PoliceSchema)
def get_police(police_id: str, db: Session = Depends(get_db)):
    police = db.query(Police).filter(Police.id == police_id).first()
    if not police:
        raise HTTPException(status_code=404, detail="Police not found")
    return police

@router.delete("/delete/{police_id}")
def delete_police(police_id: str, db: Session = Depends(get_db)):
    police = db.query(Police).filter(Police.id == police_id).first()
    if police:
        db.delete(police)
        db.commit()
        return {"message": "Police deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Police not found")

@router.put("/update/{police_id}", response_model=PoliceSchema)
def update_police(police_id: str, police_data: PoliceUpdate, db: Session = Depends(get_db)):
    police = db.query(Police).filter(Police.id == police_id).first()
    if not police:
        raise HTTPException(status_code=404, detail="Police not found")
    
    update_data = police_data.dict(exclude_unset=True)
    if 'joined' in update_data:
        update_data.pop('joined')
    
    for key, value in update_data.items():
        setattr(police, key, value)
    
    db.commit()
    db.refresh(police)
    return police

@router.get("/missions/assigned/{police_id}", response_model=List[MissionSchemas])
def get_assigned_missions(police_id: str, db: Session = Depends(get_db)):
    # Sử dụng func.any để kiểm tra xem police_id có nằm trong assigned_police_ids không
    missions = db.query(Mission).filter(Mission.assigned_police_ids.any(police_id), Mission.state == 'Assigned').all()
    if not missions:
        raise HTTPException(status_code=404, detail="No assigned missions found")
    return missions

@router.get("/mission/{mission_id}", response_model=MissionSchemas)
def get_mission(mission_id: UUID, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission

@router.put("/update_mission/{mission_id}", response_model=MissionSchemas)
def update_mission(mission_id: UUID, mission_update: MissionUpdate, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")

    update_data = mission_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(mission, key, value)
    
    db.commit()
    db.refresh(mission)
    
    return mission
