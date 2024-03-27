from typing import Union
from fastapi import FastAPI
from routers import securitystaff

app = FastAPI()

app.include_router(securitystaff.router)
