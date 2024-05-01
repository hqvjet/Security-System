from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.police import Police
from schemas.police import PoliceCreate
from passlib.hash import bcrypt

router = APIRouter()

# Route to register a new police officer
@router.post("/register")
async def register_police_officer(
    police_data: PoliceCreate,
    db: Session = Depends(SessionLocal),
):
    hashed_password = bcrypt.hash(police_data.password)
    new_police = Police(
        username=police_data.username,
        password=hashed_password,
        full_name=police_data.full_name,
        age=police_data.age,
        email=police_data.email,
        address=police_data.address,
        phone=police_data.phone,
        department=police_data.department,
        badge_number=police_data.badge_number
    )
    db.add(new_police)
    db.commit()
    db.refresh(new_police)
    return {"message": "New police officer registered successfully"}
