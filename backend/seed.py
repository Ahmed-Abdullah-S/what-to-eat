"""
Seed script for What to Eat? backend (refactored model).

How to run (from project root):

# Enter the backend container:
docker-compose exec backend bash

# Then run:
python seed.py
"""

from app.database import SessionLocal, engine, Base
from app import models

MEALS = [
    {
        "name": "بروستد البيك",
        "description": "دجاج مقلي مقرمش مع البطاطس المقلية والصلصة الخاصة",
        "emoji": "🍗",
        "price_level": "متوسط",
        "cuisine": "أمريكي",
        "dietary_type": "حلال",
        "location": "البيك - الرياض",
        "rating": 4.5
    },
    {
        "name": "كبسة دجاج",
        "description": "أرز بخاري مع دجاج مشوي ومكسرات وزبيب",
        "emoji": "🍚",
        "price_level": "متوسط",
        "cuisine": "سعودي",
        "dietary_type": "حلال",
        "location": "مطاعم الرياض",
        "rating": 4.8
    },
    {
        "name": "سوشي",
        "description": "أسماك طازجة مع أرز وأعشاب بحرية",
        "emoji": "🍣",
        "price_level": "فاخر",
        "cuisine": "ياباني",
        "dietary_type": "صحي",
        "location": "مطاعم اليابانية",
        "rating": 4.6
    },
    {
        "name": "بيتزا",
        "description": "عجينة إيطالية مع جبنة وصلصة طماطم",
        "emoji": "🍕",
        "price_level": "متوسط",
        "cuisine": "إيطالي",
        "dietary_type": "عادي",
        "location": "مطاعم إيطالية",
        "rating": 4.4
    },
    {
        "name": "فلافل",
        "description": "كرات من الحمص المطحون مع خضار في خبز",
        "emoji": "🧆",
        "price_level": "رخيص",
        "cuisine": "شامي",
        "dietary_type": "نباتي",
        "location": "مطاعم الشامية",
        "rating": 4.1
    },
    {
        "name": "سلطة يونانية",
        "description": "خضار طازجة مع جبنة فيتا وزيتون",
        "emoji": "🥗",
        "price_level": "رخيص",
        "cuisine": "يوناني",
        "dietary_type": "نباتي",
        "location": "مطاعم يونانية",
        "rating": 4.1
    },
]

def main():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for meal in MEALS:
            exists = db.query(models.Meal).filter_by(name=meal["name"]).first()
            if exists:
                continue
            m = models.Meal(**meal)
            db.add(m)
            db.commit()
    finally:
        db.close()
    print("✅ Database seeded!")

if __name__ == "__main__":
    main() 