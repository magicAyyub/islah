from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Allowed origins for CORS policy
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

# Adding CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
async def root():
    """Basic root endpoint to verify API connection."""
    return {"Connexion": "ok"}

