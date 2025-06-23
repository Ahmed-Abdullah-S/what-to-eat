from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import crud, schemas, models
from ..database import SessionLocal
from ..auth import get_current_user
import random

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.Meal])
def list_meals(skip: int = 0, limit: int = 100, cuisine: Optional[str] = None, price_level: Optional[str] = None, dietary_type: Optional[str] = None, db: Session = Depends(get_db)):
    filters = {}
    if cuisine:
        filters['cuisine'] = cuisine
    if price_level:
        filters['price_level'] = price_level
    if dietary_type:
        filters['dietary_type'] = dietary_type
    return crud.get_meals(db, skip=skip, limit=limit, filters=filters)

@router.get("/{meal_id}", response_model=schemas.Meal)
def get_meal(meal_id: int, db: Session = Depends(get_db)):
    meal = crud.get_meal(db, meal_id)
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")
    return meal

@router.post("/", response_model=schemas.Meal, status_code=status.HTTP_201_CREATED)
def create_meal(meal: schemas.MealCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    return crud.create_meal(db, meal)

@router.put("/{meal_id}", response_model=schemas.Meal)
def update_meal(meal_id: int, meal: schemas.MealUpdate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    updated = crud.update_meal(db, meal_id, meal)
    if not updated:
        raise HTTPException(status_code=404, detail="Meal not found")
    return updated

@router.delete("/{meal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meal(meal_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    deleted = crud.delete_meal(db, meal_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Meal not found")
    return

@router.get("/random", response_model=schemas.Meal)
def get_random_meal(cuisine: Optional[str] = None, price_level: Optional[str] = None, dietary_type: Optional[str] = None, db: Session = Depends(get_db)):
    filters = {}
    if cuisine:
        filters['cuisine'] = cuisine
    if price_level:
        filters['price_level'] = price_level
    if dietary_type:
        filters['dietary_type'] = dietary_type
    meals = crud.get_meals(db, filters=filters)
    if not meals:
        raise HTTPException(status_code=404, detail="No meals found")
    meal = random.choice(meals)
    crud.increment_meal_picked_count(db, meal.id)
    return meal 