from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import SessionLocal
from models.police import Police
from schemas.police import PoliceCreate, Police as PoliceSchema

router = APIRouter(tags=['Police'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/list_police", response_model=List[PoliceSchema])
def get_police_list(db: Session = Depends(get_db)):
    police_list = db.query(Police).filter(Police.role == 'police').all()
    return police_list


@router.post("/police")
def create_police(police_data: PoliceCreate, db: Session = Depends(get_db)):
    try:
        db_police = Police(**police_data.dict())
        db.add(db_police)
        db.commit()
        db.refresh(db_police)
        
        return db_police
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
