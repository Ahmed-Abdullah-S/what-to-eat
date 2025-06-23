'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MealCard from '@/components/MealCard';
import { useAppStore } from '@/lib/store';
import { Trash2, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useAppStore();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleToggleFavorite = (meal: any) => {
    removeFromFavorites(meal.id);
  };

  const handleClearAll = () => {
    clearFavorites();
    setShowConfirmClear(false);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">❤️ وجباتي المفضلة</h1>
              <p className="text-gray-600">هنا تلقى كل الوجبات اللي خطفت قلبك 🍽️</p>
            </div>

            {favorites.length > 0 && (
                <button
                    onClick={() => setShowConfirmClear(true)}
                    className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={18} />
                  <span>مسح الكل</span>
                </button>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Heart className="text-red-500" size={20} />
              <span className="text-gray-700">
              {favorites.length} {favorites.length === 1 ? 'وجبة' : 'وجبات'} في القائمة
            </span>
            </div>
          </div>

          {favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((meal) => (
                    <MealCard
                        key={meal.id}
                        meal={meal}
                        isFavorite={true}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
              </div>
          ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💔</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ما فيه شي هنا للحين!</h3>
                <p className="text-gray-600 mb-6">ابدأ الرحلة ودوّر لك وجبة تعجبك وأضفها للمفضلة</p>
                <a
                    href="/frontend/public"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  🔁 ابدأ الآن
                </a>
              </div>
          )}

          {showConfirmClear && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">مسح القائمة المفضلة</h3>
                  <p className="text-gray-600 mb-6">أكيد تبغى تمسح كل الوجبات من المفضلة؟ القرار لا يمكن التراجع عنه.</p>
                  <div className="flex space-x-4 space-x-reverse">
                    <button
                        onClick={handleClearAll}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      نعم، امسح الكل
                    </button>
                    <button
                        onClick={() => setShowConfirmClear(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
          )}
        </main>
      </div>
  );
}