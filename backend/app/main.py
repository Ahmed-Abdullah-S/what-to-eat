from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .api import meals, categories, subcategories, cuisines, diets, auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(meals.router, prefix="/api/meals", tags=["meals"])
app.include_router(categories.router, prefix="/api/categories", tags=["categories"])
app.include_router(subcategories.router, prefix="/api/subcategories", tags=["subcategories"])
app.include_router(cuisines.router, prefix="/api/cuisines", tags=["cuisines"])
app.include_router(diets.router, prefix="/api/diets", tags=["diets"]) 