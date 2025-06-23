from sqlalchemy.orm import Session
from . import models, schemas


def get_meal(db: Session, meal_id: int):
    return db.query(models.Meal).filter(models.Meal.id == meal_id).first()

def get_meals(db: Session, skip: int = 0, limit: int = 100, filters: dict = {}):
    query = db.query(models.Meal)
    if 'cuisine' in filters:
        query = query.filter(models.Meal.cuisine == filters['cuisine'])
    if 'price_level' in filters:
        query = query.filter(models.Meal.price_level == filters['price_level'])
    if 'dietary_type' in filters:
        query = query.filter(models.Meal.dietary_type == filters['dietary_type'])
    return query.offset(skip).limit(limit).all()

def create_meal(db: Session, meal: schemas.MealCreate):
    db_meal = models.Meal(
        name=meal.name,
        description=meal.description,
        emoji=meal.emoji,
        price_level=meal.price_level,
        cuisine=meal.cuisine,
        dietary_type=meal.dietary_type,
        location=meal.location,
        rating=meal.rating,
    )
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    return db_meal

def update_meal(db: Session, meal_id: int, meal: schemas.MealUpdate):
    db_meal = get_meal(db, meal_id)
    if not db_meal:
        return None
    for field, value in meal.dict(exclude_unset=True).items():
        setattr(db_meal, field, value)
    db.commit()
    db.refresh(db_meal)
    return db_meal

def delete_meal(db: Session, meal_id: int):
    db_meal = get_meal(db, meal_id)
    if db_meal:
        db.delete(db_meal)
        db.commit()
    return db_meal

def increment_meal_picked_count(db: Session, meal_id: int):
    db_meal = get_meal(db, meal_id)
    if db_meal:
        db_meal.picked_count += 1
        db.commit()
        db.refresh(db_meal)
    return db_meal 