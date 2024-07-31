from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from db import SessionLocal
from models.police import Police
from schemas.police import GeolocationUpdate, Police as PoliceSchema, PoliceUpdate
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

@router.get("/mission", response_model=MissionSchemas)
def get_mission_by_police_or_mission_id(police_id: str = None, mission_id: UUID = None, db: Session = Depends(get_db)):
    if police_id:
        mission = db.query(Mission).filter(Mission.assigned_police_ids.any(police_id)).order_by(Mission.created_at.desc()).first()
    elif mission_id:
        mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Nhiệm vụ không được tìm thấy")
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

@router.get("/geolocation", response_model=List[str])
def get_all_geolocations(db: Session = Depends(get_db)):
    geolocations = db.query(Police.geolocation).filter(Police.geolocation.isnot(None)).all()
    if not geolocations:
        raise HTTPException(status_code=404, detail="No geolocations found")
    return [geolocation[0] for geolocation in geolocations]

@router.get("/geolocation/{police_id}", response_model=str)
def get_geolocation_by_police_id(police_id: str, db: Session = Depends(get_db)):
    police = db.query(Police).filter(Police.id == police_id).first()
    if not police:
        raise HTTPException(status_code=404, detail="Police not found")
    if police.geolocation is None:
        raise HTTPException(status_code=404, detail="Geolocation not found for this police")
    return police.geolocation

@router.put("/geolocation/{police_id}", response_model=PoliceSchema)
def update_geolocation(police_id: str, geolocation_update: GeolocationUpdate, db: Session = Depends(get_db)):
    police = db.query(Police).filter(Police.id == police_id).first()
    if not police:
        raise HTTPException(status_code=404, detail="Police not found")
    police.geolocation = geolocation_update.geolocation
    db.commit()
    db.refresh(police)
    return police

