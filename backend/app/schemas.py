from typing import List, Optional
from pydantic import BaseModel

class DietBase(BaseModel):
    name: str

class DietCreate(DietBase):
    pass

class Diet(DietBase):
    id: int
    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int
    class Config:
        orm_mode = True

class SubcategoryBase(BaseModel):
    name: str

class SubcategoryCreate(SubcategoryBase):
    pass

class Subcategory(SubcategoryBase):
    id: int
    class Config:
        orm_mode = True

class CuisineBase(BaseModel):
    name: str

class CuisineCreate(CuisineBase):
    pass

class Cuisine(CuisineBase):
    id: int
    class Config:
        orm_mode = True

class MealBase(BaseModel):
    name: str
    description: Optional[str] = None
    emoji: Optional[str] = None
    price_level: Optional[str] = None
    cuisine: Optional[str] = None
    dietary_type: Optional[str] = None
    location: Optional[str] = None
    rating: Optional[float] = None

class MealCreate(MealBase):
    pass

class MealUpdate(MealBase):
    pass

class Meal(MealBase):
    id: int
    picked_count: int
    class Config:
        orm_mode = True 