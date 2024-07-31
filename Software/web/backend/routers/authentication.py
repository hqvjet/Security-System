import uuid
import logging
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from passlib.hash import bcrypt
from jose import JWTError, jwt

from db import SessionLocal
from models.admin import Admin
from models.police import Police
from models.securitystaff import SecurityStaff
from schemas.admin import AdminCreate, Login


router = APIRouter(
    prefix='/api/v1/authentication',
    tags=['Authentication']
)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

logging.basicConfig(level=logging.INFO)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    
    for key, value in to_encode.items():
        if isinstance(value, uuid.UUID):
            to_encode[key] = str(value)
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

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
def login(request: Login, db: Session = Depends(get_db), response: Response = None):
    user = db.query(Admin).filter(Admin.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username, "role": user.role, "user_id": user.id},
            expires_delta=access_token_expires
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax"
        )
        return {"username": user.username, "role": user.role, "user_id": user.id}

    user = db.query(SecurityStaff).filter(SecurityStaff.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username, "role": user.role, "user_id": user.id},
            expires_delta=access_token_expires
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax"
        )
        return {"username": user.username, "role": user.role, "user_id": user.id}

    user = db.query(Police).filter(Police.username == request.username).first()
    if user and pwd_context.verify(request.password, user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username, "role": user.role, "user_id": user.id},
            expires_delta=access_token_expires
        )
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="Lax"
        )
        return {"username": user.username, "role": user.role, "user_id": user.id}

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password"
    )

def get_current_user(request: Request):
    token = request.cookies.get('access_token')
    if token:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_name: str = payload.get("sub")
        except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return user_name
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

@router.get('/me')
def get_me(request: Request, db: Session = Depends(get_db)):
    user_name = get_current_user(request)
    user = db.query(Admin).filter(Admin.username == user_name).first()
    if user:
        return {"full_name": user.full_name, "role": user.role, "user_id": user.id}
    
    user = db.query(SecurityStaff).filter(SecurityStaff.username == user_name).first()
    if user:
        return {"full_name": user.full_name, "role": user.role, "user_id": user.id}
    
    user = db.query(Police).filter(Police.username == user_name).first()
    if user:
        return {"full_name": user.full_name, "role": user.role, "user_id": user.id}
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

@router.post('/logout')
def logout(response: Response):
    response.delete_cookie('access_token', path='/', domain=None)
    return {"message": "Logged out successfully"}
