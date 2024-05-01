from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.admin import Admin
from schemas.admin import AdminCreate
from passlib.hash import bcrypt
import logging

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Cấu hình logging
logging.basicConfig(level=logging.INFO)

# Route to register a new admin user
@router.post("/register-admin")
async def register_admin_user(admin_data: AdminCreate, db: Session = Depends(get_db)):
    logging.info(f"Received data: {admin_data.dict()}")
    try:
        # Kiểm tra xem username đã tồn tại chưa
        if db.query(Admin).filter(Admin.username == admin_data.username).first() is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
        
        # Kiểm tra xem email đã tồn tại chưa
        if db.query(Admin).filter(Admin.email == admin_data.email).first() is not None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
        
        # Kiểm tra xác nhận mật khẩu
        if admin_data.password != admin_data.confirmPassword:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
        
        # Hash the password
        hashed_password = bcrypt.hash(admin_data.password)

        # Create a new admin instance
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

        # Add the admin to the database session
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)

        # In ra thông báo khi đăng ký thành công
        logging.info("New admin user registered successfully")

        return {
            "message": "New admin user registered successfully",
            "user": {
                "username": new_admin.username,
                "full_name": new_admin.full_name,
                "age": new_admin.age,
                "email": new_admin.email,
                "address": new_admin.address,
                "phone": new_admin.phone,
                "cccd": new_admin.cccd,
                "role": new_admin.role
            }
        }
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise
