from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import admin, police, securitystaff, authentication  # Import router authentication

app = FastAPI()

# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Bao gồm các router
app.include_router(admin.router)
app.include_router(police.router)
app.include_router(securitystaff.router)
app.include_router(authentication.router) 
