'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MealCard from '@/components/MealCard';
import { useAppStore } from '@/lib/store';
import { meals } from '@/lib/meals';
import { ArrowLeft, Share2, Heart } from 'lucide-react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useAppStore();

  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mealId = searchParams.get('id');
    if (mealId) {
      const foundMeal = meals.find(m => m.id === mealId);
      setMeal(foundMeal || null);
    }
    setLoading(false);
  }, [searchParams]);

  const handleToggleFavorite = (meal: any) => {
    if (isFavorite(meal.id)) {
      removeFromFavorites(meal.id);
    } else {
      addToFavorites(meal);
    }
  };

  const handleShare = async () => {
    if (navigator.share && meal) {
      try {
        await navigator.share({
          title: `وش آكل؟ - ${meal.name}`,
          text: `جربت ${meal.name} من تطبيق وش آكل؟`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('فشلت المشاركة:', err);
      }
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">⏳ جاري التحميل...</p>
            </div>
          </div>
        </div>
    );
  }

  if (!meal) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ما لقينا الوجبة</h2>
              <p className="text-gray-600 mb-6">يمكن تكون انحذفت أو الرابط فيه خطأ</p>
              <button
                  onClick={() => router.push('/')}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
              >
                🔁 جرّب من جديد
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>رجوع</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🍽️ {meal.name}</h1>
            <p className="text-xl text-gray-600">وش اخترنا لك؟ هنا التفاصيل</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
              <div className="text-8xl">{meal.emoji}</div>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{meal.name}</h2>
                  <p className="text-gray-600 text-lg">{meal.description}</p>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <button
                      onClick={handleShare}
                      className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      title="مشاركة"
                  >
                    <Share2 size={20} />
                  </button>
                  <button
                      onClick={() => handleToggleFavorite(meal)}
                      className={`p-3 rounded-lg transition-colors ${
                          isFavorite(meal.id)
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={isFavorite(meal.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  >
                    <Heart size={20} fill={isFavorite(meal.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                💰 {meal.priceLevel}
              </span>
                <span className="px-4 py-2 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
                🌍 {meal.cuisine}
              </span>
                <span className="px-4 py-2 bg-success-100 text-success-800 rounded-full text-sm font-medium">
                🥗 {meal.dietaryType}
              </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {meal.location && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">📍 وين تلقاها؟</h3>
                      <p className="text-gray-600">{meal.location}</p>
                    </div>
                )}
                {meal.rating && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">⭐ التقييم العام</h3>
                      <p className="text-gray-600">{meal.rating} من 5</p>
                    </div>
                )}
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <button
                    onClick={() => router.push('/')}
                    className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  🔁 تجربة جديدة
                </button>
                <button
                    onClick={() => router.push('/challenge')}
                    className="flex-1 bg-secondary-500 text-white py-3 px-6 rounded-lg hover:bg-secondary-600 transition-colors font-medium"
                >
                  🎲 تحدي جديد
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">🍽️ ممكن يعجبك بعد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals
                  .filter(m => m.cuisine === meal.cuisine && m.id !== meal.id)
                  .slice(0, 3)
                  .map((similarMeal) => (
                      <MealCard
                          key={similarMeal.id}
                          meal={similarMeal}
                          isFavorite={isFavorite(similarMeal.id)}
                          onToggleFavorite={handleToggleFavorite}
                      />
                  ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ وش تبي تسوي بعد؟</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                  onClick={() => router.push('/')}
                  className="p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-center"
              >
                🎯 دوّر العجلة
              </button>
              <button
                  onClick={() => router.push('/favorites')}
                  className="p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-center"
              >
                ❤️ شوف المفضلة
              </button>
              <button
                  onClick={() => router.push('/challenge')}
                  className="p-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors text-center"
              >
                🎲 جرب تحدي
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}