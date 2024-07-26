from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import SessionLocal
from models.police import Police
from schemas.police import PoliceCreate, Police as PoliceSchema, PoliceUpdate

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

@router.get("/get/{police_id}")
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
