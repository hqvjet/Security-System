from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from db import SessionLocal
from models.securitystaff import SecurityStaff
from schemas.securitystaff import SecurityStaffCreate, SecurityStaff as SecurityStaffSchema, SecurityStaffUpdate

router = APIRouter(
    prefix='/api/v1/security',
    tags=['Security Staff']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/get_list", response_model=List[SecurityStaffSchema])
def get_security_staff_list(db: Session = Depends(get_db)):
    security_staff_list = db.query(SecurityStaff).filter(SecurityStaff.role == 'security').all()
    return security_staff_list

@router.post("/create", response_model=SecurityStaffSchema)
def create_security_staff(security_staff_data: SecurityStaffCreate, db: Session = Depends(get_db)):
    try:
        db_security_staff = SecurityStaff(**security_staff_data.dict())
        db.add(db_security_staff)
        db.commit()
        db.refresh(db_security_staff)
        return db_security_staff
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/delete/{security_id}")
def delete_security(security_id: str, db: Session = Depends(get_db)):
    security = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if security:
        db.delete(security)
        db.commit()
        return {"message": "Security staff deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Police not found")
    
@router.get("/get/{security_id}")
def get_security(security_id: str, db: Session = Depends(get_db)):
    security_staff = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if not security_staff:
        raise HTTPException(status_code=404, detail="Security staff not found")
    return security_staff

@router.put("/update/{security_id}", response_model=SecurityStaffSchema)
def update_security(security_id: str, security_staff_data: SecurityStaffUpdate, db: Session = Depends(get_db)):
    security_staff = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if not security_staff:
        raise HTTPException(status_code=404, detail="Security staff not found")

    update_data = security_staff_data.dict(exclude_unset=True)
    if 'joined' in update_data:
        update_data.pop('joined')
    
    for key, value in update_data.items():
        setattr(security_staff, key, value)

    db.commit()
    db.refresh(security_staff)
    return security_staff

