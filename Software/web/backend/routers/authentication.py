from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.admin import Admin
from schemas.admin import AdminCreate
from db import SessionLocal
from passlib.hash import bcrypt

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to register a new user
@router.post("/register")
async def register_admin_user(admin_data: AdminCreate, db: Session = Depends(get_db)):
    if db.query(Admin).filter(Admin.username == admin_data.username).first() is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    if db.query(Admin).filter(Admin.email == admin_data.email).first() is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    
    # Hash the password
    hashed_password = bcrypt.hash(admin_data.password)

    # Create a new user instance
    new_admin = Admin(
        username=admin_data.username,
        password=hashed_password,
        full_name=admin_data.full_name,
        age=admin_data.age,
        email=admin_data.email,
        address=admin_data.address,
        phone=admin_data.phone,
        cccd=admin_data.cccd,
        role="admin"
    )

    # Add the user to the database session
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return {
        "message": "New user registered successfully",
        "user": {
            "username": new_admin.username,
            "email": new_admin.email,
            "full_name": new_admin.full_name,
            "age": new_admin.age,
            "address": new_admin.address,
            "phone": new_admin.phone,
            "cccd": new_admin.cccd
        }
    }
