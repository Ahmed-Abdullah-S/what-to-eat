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

@router.get("/", response_model=List[schemas.Category])
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)

@router.get("/{category_id}", response_model=schemas.Category)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = crud.get_category(db, category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=schemas.Category, status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return crud.create_category(db, category)

@router.put("/{category_id}", response_model=schemas.Category)
def update_category(category_id: int, category: schemas.CategoryCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    updated = crud.update_category(db, category_id, category)
    if not updated:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(category_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deleted = crud.delete_category(db, category_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Category not found")
    return 