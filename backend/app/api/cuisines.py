from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..database import SessionLocal
from ..auth import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.Cuisine])
def list_cuisines(db: Session = Depends(get_db)):
    return crud.get_cuisines(db)

@router.get("/{cuisine_id}", response_model=schemas.Cuisine)
def get_cuisine(cuisine_id: int, db: Session = Depends(get_db)):
    cuisine = crud.get_cuisine(db, cuisine_id)
    if not cuisine:
        raise HTTPException(status_code=404, detail="Cuisine not found")
    return cuisine

@router.post("/", response_model=schemas.Cuisine, status_code=status.HTTP_201_CREATED)
def create_cuisine(cuisine: schemas.CuisineCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return crud.create_cuisine(db, cuisine)

@router.put("/{cuisine_id}", response_model=schemas.Cuisine)
def update_cuisine(cuisine_id: int, cuisine: schemas.CuisineCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    updated = crud.update_cuisine(db, cuisine_id, cuisine)
    if not updated:
        raise HTTPException(status_code=404, detail="Cuisine not found")
    return updated

@router.delete("/{cuisine_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cuisine(cuisine_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deleted = crud.delete_cuisine(db, cuisine_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Cuisine not found")
    return 