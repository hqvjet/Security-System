import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.admin import Admin
from models.police import Police
from models.securitystaff import SecurityStaff
from schemas.admin import AdminCreate, Login
from passlib.hash import bcrypt
from passlib.context import CryptContext
import logging

router = APIRouter(
    prefix='/api/v1/authentication',
    tags=['Authentication']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
 
logging.basicConfig(level=logging.INFO)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register-admin")
def register_admin_user(admin_data: AdminCreate, db: Session = Depends(get_db)):
    try:
        if db.query(Admin).filter(Admin.username == admin_data.username).first() is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
        if db.query(Admin).filter(Admin.email == admin_data.email).first() is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
        if admin_data.password != admin_data.confirmPassword:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
        hashed_password = bcrypt.hash(admin_data.password)

        new_admin = Admin(
            id=str(uuid.uuid4()),
            username=admin_data.username,
            password=hashed_password,
            full_name=admin_data.full_name,
            age=admin_data.age,
            email=admin_data.email,
            address=admin_data.address,
            phone=admin_data.phone,
            cccd=admin_data.cccd,
            role='admin'
        )

        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise

@router.post('/login')
def login(request: Login, db: Session = Depends(get_db)):
    user = db.query(Admin).filter(Admin.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        return {"username": user.username, "role": user.role}

    user = db.query(SecurityStaff).filter(SecurityStaff.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        return {"username": user.username, "role": user.role}

    user = db.query(Police).filter(Police.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        return {"username": user.username, "role": user.role}

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password"
    )
