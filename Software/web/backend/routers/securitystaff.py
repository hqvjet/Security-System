from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal
from schemas.securitystaff import SecurityStaffCreate
from models.securitystaff import SecurityStaff

router = APIRouter()

# Route to register new security staff
@router.post("/register")
async def register_security_staff(
    security_staff_data: SecurityStaffCreate,
    db: Session = Depends(SessionLocal),
):
    # Tạo một đối tượng SecurityStaff từ dữ liệu nhận được
    new_security_staff = SecurityStaff(**security_staff_data.dict())
    
    # Lưu đối tượng mới vào cơ sở dữ liệu
    db.add(new_security_staff)
    db.commit()
    db.refresh(new_security_staff)
    
    return {"message": "New security staff registered successfully"}

# Các route khác cho router.securitystaff có thể được thêm vào ở đây

