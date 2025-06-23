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

@router.get("/", response_model=List[schemas.Diet])
def list_diets(db: Session = Depends(get_db)):
    return crud.get_diets(db)

@router.get("/{diet_id}", response_model=schemas.Diet)
def get_diet(diet_id: int, db: Session = Depends(get_db)):
    diet = crud.get_diet(db, diet_id)
    if not diet:
        raise HTTPException(status_code=404, detail="Diet not found")
    return diet

@router.post("/", response_model=schemas.Diet, status_code=status.HTTP_201_CREATED)
def create_diet(diet: schemas.DietCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return crud.create_diet(db, diet)

@router.put("/{diet_id}", response_model=schemas.Diet)
def update_diet(diet_id: int, diet: schemas.DietCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    updated = crud.update_diet(db, diet_id, diet)
    if not updated:
        raise HTTPException(status_code=404, detail="Diet not found")
    return updated

@router.delete("/{diet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_diet(diet_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deleted = crud.delete_diet(db, diet_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Diet not found")
    return 