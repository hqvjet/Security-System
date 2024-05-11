from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.admin import Admin
from db import SessionLocal
from models.securitystaff import SecurityStaff
from schemas.securitystaff import SecurityStaffCreate, SecurityStaff as SecurityStaffSchema

router = APIRouter(tags=['Security Staff'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/list_security-staff", response_model=List[SecurityStaffSchema])
def get_security_staff_list(db: Session = Depends(get_db)):
    security_staff_list = db.query(SecurityStaff).filter(SecurityStaff.role == 'security').all()
    return security_staff_list

@router.post("/security_staff", response_model=SecurityStaffSchema)
def create_security_staff(security_staff_data: SecurityStaffCreate, db: Session = Depends(get_db)):
    try:
        db_security_staff = SecurityStaff(**security_staff_data.dict())
        db.add(db_security_staff)
        db.commit()
        db.refresh(db_security_staff)
        return db_security_staff
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
