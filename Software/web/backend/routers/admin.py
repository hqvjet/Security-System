from datetime import datetime
from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.admin import Admin
from models.police import Police
from schemas.police import PoliceCreate
from models.securitystaff import SecurityStaff
from schemas.securitystaff import SecurityStaffCreate
from schemas.admin import AdminCreate
from passlib.hash import bcrypt
import logging

router = APIRouter(
    prefix='/api/v1/admin',
    tags=['ADMIN']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

logging.basicConfig(level=logging.INFO)

@router.post("/add-staff")
def add_staff(admin_data: Union[PoliceCreate, SecurityStaffCreate], db: Session = Depends(get_db)):
    try:
        current_time = datetime.now()
        if admin_data.role == 'security':
            return add_security(admin_data, db, current_time)
        elif admin_data.role == 'police':
            return add_police(admin_data, db, current_time)
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid role")
    except HTTPException as http_err:
        raise http_err
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

def add_police(police_data: PoliceCreate, db: Session, joined_time: datetime):
    try:
        hashed_password = bcrypt.hash(police_data.password)
        new_police = Police(
            id = police_data.id,
            username=police_data.username,
            password=hashed_password,
            full_name=police_data.full_name,
            age=police_data.age,
            email=police_data.email,
            address=police_data.address,
            phone=police_data.phone,
            description=police_data.description,
            role=police_data.role,
            cccd=police_data.cccd,
            certification=police_data.certification,
            work_history=police_data.work_history,
            avatar=police_data.avatar,
            joined=joined_time,
            work_at=police_data.work_at
        )
        db.add(new_police)
        db.commit()
        return {"message": "Security staff created successfully", "data": new_police}
    except Exception as e:
        logging.error(f"An error occurred while adding security staff: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

def add_security(securitystaff_data: SecurityStaffCreate, db: Session, joined_time: datetime):
    try:
        hashed_password = bcrypt.hash(securitystaff_data.password)
        new_security = SecurityStaff(
            id = securitystaff_data.id,
            username=securitystaff_data.username,
            password=hashed_password,
            full_name=securitystaff_data.full_name,
            age=securitystaff_data.age,
            email=securitystaff_data.email,
            address=securitystaff_data.address,
            phone=securitystaff_data.phone,
            description=securitystaff_data.description,
            role=securitystaff_data.role,
            cccd=securitystaff_data.cccd,
            avatar=securitystaff_data.avatar,
            joined= joined_time,
            work_at=securitystaff_data.work_at
        )
        db.add(new_security)
        db.commit()
        return {"message": "Police created successfully", "data": new_security}
    except Exception as e:
        logging.error(f"An error occurred while adding police: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
