from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import admin, police, iotdevice, securitystaff, authentication

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(police.router)
app.include_router(iotdevice.router)
app.include_router(securitystaff.router)
app.include_router(authentication.router) 
