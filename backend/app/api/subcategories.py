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

@router.get("/", response_model=List[schemas.Subcategory])
def list_subcategories(db: Session = Depends(get_db)):
    return crud.get_subcategories(db)

@router.get("/{subcategory_id}", response_model=schemas.Subcategory)
def get_subcategory(subcategory_id: int, db: Session = Depends(get_db)):
    subcategory = crud.get_subcategory(db, subcategory_id)
    if not subcategory:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    return subcategory

@router.post("/", response_model=schemas.Subcategory, status_code=status.HTTP_201_CREATED)
def create_subcategory(subcategory: schemas.SubcategoryCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return crud.create_subcategory(db, subcategory)

@router.put("/{subcategory_id}", response_model=schemas.Subcategory)
def update_subcategory(subcategory_id: int, subcategory: schemas.SubcategoryCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    updated = crud.update_subcategory(db, subcategory_id, subcategory)
    if not updated:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    return updated

@router.delete("/{subcategory_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_subcategory(subcategory_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deleted = crud.delete_subcategory(db, subcategory_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Subcategory not found")
    return 