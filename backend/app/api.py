"""
This module contains the FastAPI application and its configuration.
"""

import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from utils.database import engine, get_db
import utils.models as models
from app.routes import students, mentors, degrees, classrooms, courses, attendances, payments
from utils.settings import ORIGINS

if os.getenv("ENV") == "development":
    # Create all tables for the first time
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)

 

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Include all routes
app.include_router(students.router)
app.include_router(mentors.router)
app.include_router(degrees.router)
app.include_router(classrooms.router)
app.include_router(courses.router)
app.include_router(attendances.router)
app.include_router(payments.router)


# Root endpoint to verify API connection
@app.get("/")
async def root() -> dict[str, str]:
    """Basic root endpoint to verify API connection."""
    return {"Connexion": "ok"}

