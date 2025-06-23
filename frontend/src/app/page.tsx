'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FilterControls from '@/components/FilterControls';
import SpinnerSlotMachine from '@/components/SpinnerSlotMachine';
import MealCard from '@/components/MealCard';
import { useAppStore } from '@/lib/store';
import { getFilteredMeals } from '@/lib/meals';
import { Meal, FilterOptions } from '@/types/meal';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const router = useRouter();
  const {
    currentMeal,
    filters,
    setCurrentMeal,
    setIsSpinning,
    setFilters,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useAppStore();

  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const meals = getFilteredMeals(filters);
    setFilteredMeals(meals);
  }, [filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setShowResult(false);
    setCurrentMeal(null);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setShowResult(false);
  };

  const handleSpinComplete = (meal: Meal) => {
    confetti({ particleCount: 100, spread: 70 });
    setCurrentMeal(meal);
    setIsSpinning(false);
    setShowResult(true);
  };

  const handleToggleFavorite = (meal: Meal) => {
    if (isFavorite(meal.id)) {
      removeFromFavorites(meal.id);
    } else {
      addToFavorites(meal);
    }
  };

  const handleSpinAgain = () => {
    setShowResult(false);
    setCurrentMeal(null);
  };

  const handleViewResult = () => {
    if (currentMeal) {
      router.push(`/result?id=${currentMeal.id}`);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/waves.svg')] bg-no-repeat bg-cover z-0" />
        <Navbar />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with fallback image */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="https://cdn-icons-png.flaticon.com/512/1995/1995531.png" alt="Chef" className="w-32 h-32"/>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-4 leading-tight">
              <span className="inline-block align-middle">🍽️</span> وش آكل؟
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تطبيق تفاعلي يساعدك في اختيار ما تأكله في الرياض، السعودية
            </p>
          </div>

          {/* Filters */}
          <div className=" backdrop-blur-md rounded-xl p-4 mt-4">
            <FilterControls filters={filters} onFiltersChange={handleFiltersChange}/>
          </div>

          {/* Spinner Centered */}
          <div className="flex justify-center mt-6">
            <SpinnerSlotMachine
                meals={filteredMeals}
                onSpin={handleSpin}
                onSpinComplete={handleSpinComplete}
            />
          </div>

          {/* Result Modal */}
          {showResult && currentMeal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center animate-fade-in-up">
                  <div className="text-4xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">تم اختيار وجبتك!</h2>
                  <p className="text-gray-600 mb-4">مبروك! هذه هي الوجبة التي اختارتها العجلة لك</p>

                  <MealCard
                      meal={currentMeal}
                      isFavorite={isFavorite(currentMeal.id)}
                      onToggleFavorite={handleToggleFavorite}
                      showActions={false}
                  />

                  <div className="mt-6 flex space-x-4 space-x-reverse">
                    <button
                        onClick={handleViewResult}
                        className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      عرض التفاصيل
                    </button>
                    <button
                        onClick={handleSpinAgain}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      جرب مرة أخرى
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md animate-fade-in-up">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {filteredMeals.length}
              </div>
              <div className="text-gray-600">وجبة متاحة</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md animate-fade-in-up delay-100">
              <div className="text-3xl font-bold text-secondary-600 mb-2">
                {filteredMeals.filter(m => m.cuisine === 'سعودي').length}
              </div>
              <div className="text-gray-600">وجبة سعودية</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md animate-fade-in-up delay-200">
              <div className="text-3xl font-bold text-success-600 mb-2">
                {filteredMeals.filter(m => m.priceLevel === 'رخيص').length}
              </div>
              <div className="text-gray-600">وجبة رخيصة</div>
            </div>
          </div>

          {/* Top Picks Section */}
          <h2 className="text-xl font-bold text-gray-800 mt-12 mb-4 text-center">👑 أشهر الوجبات المقترحة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.slice(0, 3).map(meal => (
                <MealCard
                    key={meal.id}
                    meal={meal}
                    isFavorite={isFavorite(meal.id)}
                    onToggleFavorite={handleToggleFavorite}
                />
            ))}
          </div>

          {/* Quote */}
          <div className="mt-12 text-center text-lg text-gray-600 italic">
            "الوجبة الأفضل، أحياناً هي اللي ما تخطر على بالك!" 🍴
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-400 text-sm">
            صنع بكل ❤️ في الرياض — @ahmed.codes
          </footer>
        </main>
      </div>
  );
}
