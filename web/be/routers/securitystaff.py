from fastapi import APIRouter, Request
from db import get_db
from models import __all__ as models

router = APIRouter(prefix="/securitystaff", tags=["securitystaff"])

@router.get("/tracking")
def tracking():
    db = get_db()
    admins = db.query(models['admin']).all()

    for admin in admins:
        print(admin)

    return {"pr": "Security staff prediction"}

@router.post('/alert/accept')
def accept_alert(req: Request):
    print(req.json())
    return {"pr": "Alert accepted"}

@router.post('/alert/reject')
def reject_alert(req: Request):
    print(req.json())
    return {"pr": "Alert rejected"}
