from datetime import datetime
from typing import List, Union
from uuid import UUID
import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from db import SessionLocal
from models.admin import Admin
from models.police import Police
from models.securitystaff import SecurityStaff
from models.mission import Mission

from schemas.admin import AdminSchema
from schemas.police import PoliceCreate
from schemas.securitystaff import SecurityStaffCreate
from schemas.mission import Mission as MissionSchemas


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

@router.get("/get_list", response_model=List[str])
def get_admin_username_list(db: Session = Depends(get_db)):
    admin_usernames = db.query(Admin.username).all()
    return [username for (username,) in admin_usernames]

@router.get("/get-username/{admin_id}", response_model=AdminSchema)
def get_admin_username(admin_id: str, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found")
    return admin

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
    
@router.get("/get_mission/{mission_id}", response_model=MissionSchemas)
def get_mission(mission_id: UUID, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return mission

@router.delete("/delete_mission/{mission_id}", response_model=dict)
def delete_mission(mission_id: UUID, db: Session = Depends(get_db)):
    mission = db.query(Mission).filter(Mission.id == mission_id).first()
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    db.delete(mission)
    db.commit()
    return {"message": "Mission deleted successfully"}

@router.get("/get_all_missions", response_model=List[MissionSchemas])
def get_all_missions(db: Session = Depends(get_db)):
    missions = db.query(Mission).all()
    return missions
