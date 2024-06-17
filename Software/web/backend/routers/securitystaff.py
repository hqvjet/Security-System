import time
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File 
from fastapi.responses import StreamingResponse, FileResponse
from sqlalchemy.orm import Session
from typing import List
import shutil
from io import BytesIO
import os
import ffmpeg
from db import SessionLocal
from models.securitystaff import SecurityStaff
from schemas.securitystaff import SecurityStaffCreate, SecurityStaff as SecurityStaffSchema, SecurityStaffUpdate

router = APIRouter(
    prefix='/api/v1/security_staff',
    tags=['Security Staff']
)

is_violence = False
violence_video = None
buffer = BytesIO()

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

@router.delete("/security/{security_id}")
def delete_security(security_id: str, db: Session = Depends(get_db)):
    security = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if security:
        db.delete(security)
        db.commit()
        return {"message": "Security staff deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Police not found")
    
@router.get("/security/{security_id}")
def get_security(security_id: str, db: Session = Depends(get_db)):
    security_staff = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if not security_staff:
        raise HTTPException(status_code=404, detail="Security staff not found")
    return security_staff

@router.put("/security/{security_id}", response_model=SecurityStaffSchema)
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

@router.post("/violence/upload_video")
async def upload_violence_video(video: UploadFile = File(...)):
    global is_violence
    global buffer
    path = 'resources/video/video.h264'

    if is_violence:
        return 0, 200

    video_bytes = await video.read()
    with open(path, 'wb') as f:
        f.write(video_bytes)
    stream = ffmpeg.input(path)
    stream = ffmpeg.output(stream, 'resources/video/video.mp4').overwrite_output()
    ffmpeg.run(stream)
    
    is_violence = True
    # save_path = os.path.join('resources/video', video.filename)
    #
    # with open(save_path, 'wb') as buffer:
    #     shutil.copyfileobj(video.file, buffer)
    
    return 1, 200

@router.get("/violence/get_video")
async def get_violence_video():
    global buffer

    file_path = os.path.join('resources/video', 'video.mp4')

    return FileResponse(file_path, media_type='video/mp4')

@router.get("/violence/is_violence")
def is_violence_detected():
    if is_violence:
        return {'message': 1}

    return {'message': 0}

@router.get('/violence/save_video')
def save_video():
    if video_bytes:
        with open('resources/video/', 'wb') as buffer:
            shutil.copyfileobj(violence_video.file, buffer)

        return {'message': f'video saved'}

@router.get('/violence/deny')
def deny_violence():
    global is_violence
    is_violence = False
    return 0, 200

# @router.get('/violence/accept')
# def accept_violence():
#     pass
