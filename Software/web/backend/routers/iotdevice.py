from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import SessionLocal
from models.iotdevice import IoTDevice
from schemas.iotdevice import IoTDevice as IoTDeviceSchema, IoTDeviceCreate

router = APIRouter(
    prefix='/api/v1/iot',
    tags=['IoT Device']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/get_list", response_model=List[IoTDeviceSchema])
def get_device_list(db: Session = Depends(get_db)):
    devices = db.query(IoTDevice).all()
    return devices

@router.get("/get/{device_id}", response_model=IoTDeviceSchema)
def get_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(IoTDevice).filter(IoTDevice.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

@router.post("/create")
def create_device(device_data: IoTDeviceCreate, db: Session = Depends(get_db)):
    try:
        db_device = IoTDevice(**device_data.dict())
        db.add(db_device)
        db.commit()
        db.refresh(db_device)
        
        return db_device
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/delete/{device_id}")
def delete_device(device_id: str, db: Session = Depends(get_db)):
    device = db.query(IoTDevice).filter(IoTDevice.id == device_id).first()
    if device:
        db.delete(device)
        db.commit()
        return {"message": "Device deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Device not found")
    
@router.put("/update/{device_id}", response_model=IoTDeviceSchema)
def update_device(device_id: str, device_data: IoTDeviceCreate, db: Session = Depends(get_db)):
    device = db.query(IoTDevice).filter(IoTDevice.id == device_id).first()
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    
    update_data = device_data.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(device, key, value)
    
    db.commit()
    db.refresh(device)
    return device
