from io import BytesIO
import os
import shutil
from pathlib import Path
import ffmpeg
import bcrypt

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import Dict, List

from db import SessionLocal
from models.securitystaff import SecurityStaff
from models.police import Police
from models.mission import Mission
from schemas.securitystaff import SecurityStaff as SecurityStaffSchema, SecurityStaffUpdate
from schemas.mission import Mission as MissionSchemas

router = APIRouter(
    prefix='/api/v1/security_staff',
    tags=['Security Staff']
)

is_violence = False

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/get_list", response_model=List[SecurityStaffSchema])
def get_security_staff_list(db: Session = Depends(get_db)):
    security_staff_list = db.query(SecurityStaff).filter(SecurityStaff.role == 'security').all()
    return security_staff_list

@router.delete("/delete/{security_id}")
def delete_security(security_id: str, db: Session = Depends(get_db)):
    security = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if security:
        db.delete(security)
        db.commit()
        return {"message": "Security staff deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Police not found")
    
@router.get("/get/{security_id}")
def get_security(security_id: str, db: Session = Depends(get_db)):
    security_staff = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if not security_staff:
        raise HTTPException(status_code=404, detail="Security staff not found")
    return security_staff

@router.put("/update/{security_id}", response_model=SecurityStaffSchema)
def update_security(security_id: str, security_staff_data: SecurityStaffUpdate, db: Session = Depends(get_db)):
    security_staff = db.query(SecurityStaff).filter(SecurityStaff.id == security_id).first()
    if not security_staff:
        raise HTTPException(status_code=404, detail="Security staff not found")
    update_data = security_staff_data.dict(exclude_unset=True)
    if 'password' in update_data:
        hashed_password = bcrypt.hashpw(update_data['password'].encode('utf-8'), bcrypt.gensalt())
        update_data['password'] = hashed_password.decode('utf-8')
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
    path = 'resources/video/violence.mp4'
    # processed_file_path = 'resources/video/video.mp4'

    if is_violence:
        return {'res': 0}, 200

    video_bytes = await video.read()
    with open(path, 'wb') as f:
        f.write(video_bytes)
    # stream = ffmpeg.input(path)

    # ffmpeg.input(path).output(processed_file_path, vcod ec='libx264', preset='medium', profile='main').run()
    
    is_violence = True
    # save_path = os.path.join('resources/video', video.filename)
    #
    # with open(save_path, 'wb') as buffer:
    #     shutil.copyfileobj(video.file, buffer)
    
    return {'res': 1}, 200

@router.get("/violence/get_video")
async def get_violence_video():
    return FileResponse('resources/video/violence.mp4', media_type='video/mp4')

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

@router.get('/violence/accept')
def accept_violence():
    pass

@router.post('/assign_missions', response_model=MissionSchemas)
def assign_missions(missionData: Dict, db: Session = Depends(get_db)):
    location = missionData.get('location')
    police_ids = missionData.get('police')
    security_staff_id = missionData.get('security_staff_id')
    iot_device_id = missionData.get('iot_device_id')
    
    if not location or not police_ids or not security_staff_id or not iot_device_id:
        raise HTTPException(status_code=400, detail="Invalid mission data")
    assigned_police = db.query(Police).filter(Police.id.in_(police_ids)).all()
    if not assigned_police:
        raise HTTPException(status_code=404, detail="Police not found")
    new_mission = Mission(
        security_staff_id=security_staff_id,
        iot_device_id=iot_device_id,
        location=location,
        assigned_police_ids=police_ids,
        state="Assigned"
    )
    db.add(new_mission)
    db.commit()
    db.refresh(new_mission)
    
    return new_mission
