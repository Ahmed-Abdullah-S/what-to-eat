'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import FilterControls from '@/components/FilterControls';
import SpinnerWheel from '@/components/SpinnerSlotMachine';
import MealCard from '@/components/MealCard';
import { useAppStore } from '@/lib/store';
import { getFilteredMeals } from '@/lib/meals';
import { Meal, FilterOptions } from '@/types/meal';
import { Share2, Copy } from 'lucide-react';

export default function ChallengePage() {
  const router = useRouter();
  const { setCurrentMeal, setIsSpinning } = useAppStore();

  const [filters, setFilters] = useState<FilterOptions>({});
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [isSpinning, setIsSpinningLocal] = useState(false);
  const [currentMeal, setCurrentMealLocal] = useState<Meal | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [challengeId, setChallengeId] = useState<string>('');
  const [challengeLink, setChallengeLink] = useState<string>('');

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    const meals = getFilteredMeals(newFilters);
    setFilteredMeals(meals);
    setShowResult(false);
    setCurrentMealLocal(null);
  };

  const handleSpin = () => {
    setIsSpinningLocal(true);
    setShowResult(false);
  };

  const handleSpinComplete = (meal: Meal) => {
    setCurrentMealLocal(meal);
    setIsSpinningLocal(false);
    setShowResult(true);

    const id = Math.random().toString(36).substring(2, 8);
    setChallengeId(id);
    setChallengeLink(`${window.location.origin}/challenge/${id}`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(challengeLink);
      alert('📋 تم نسخ رابط التحدي!');
    } catch (err) {
      console.error('فشل نسخ الرابط:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تحدي وش آكل؟',
          text: 'تحديتني تختار لي وجبة؟ جربها بنفسك!',
          url: challengeLink,
        });
      } catch (err) {
        console.error('فشل المشاركة:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🎯 تحدي الأصدقاء</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              خلك جريء وخلي صاحبك يختار وش تاكل! أنشئ تحدي وشارك الرابط
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="text-2xl">📝</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">طريقة التحدي</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>اختر فلاتر السعر أو نوع الأكل أو النمط الغذائي</li>
                  <li>ادور العجلة واطلع لك وجبة</li>
                  <li>انسخ الرابط وارسله لصديقك</li>
                  <li>هو يختار لك وجبة جديدة من نفس الفلاتر</li>
                </ol>
              </div>
            </div>
          </div>

          <FilterControls filters={filters} onFiltersChange={handleFiltersChange} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex justify-center">
              <SpinnerWheel
                  meals={filteredMeals}
                  isSpinning={isSpinning}
                  onSpin={handleSpin}
                  onSpinComplete={handleSpinComplete}
              />
            </div>

            <div className="flex flex-col justify-center">
              {showResult && currentMeal ? (
                  <div className="fade-in">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">🎁</div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">هذه وجبتك للتحدي!</h2>
                      <p className="text-gray-600">شاركها مع صديقك وخله يدوّر لك وجبة ثانية</p>
                    </div>
                    <MealCard
                        meal={currentMeal}
                        isFavorite={false}
                        onToggleFavorite={() => {}}
                        showActions={false}
                    />

                    <div className="mt-6 space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">رابط التحدي:</h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input
                              type="text"
                              value={challengeLink}
                              readOnly
                              className="flex-1 p-2 border border-gray-300 rounded-lg bg-white text-sm"
                          />
                          <button
                              onClick={handleCopyLink}
                              className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            <Copy size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex space-x-3 space-x-reverse">
                        <button
                            onClick={handleShare}
                            className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center space-x-2 space-x-reverse"
                        >
                          <Share2 size={18} />
                          <span>شارك التحدي</span>
                        </button>
                        <button
                            onClick={() => {
                              setShowResult(false);
                              setCurrentMealLocal(null);
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          جرب مرة ثانية
                        </button>
                      </div>
                    </div>
                  </div>
              ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold mb-2">اختر الفلاتر ودوّر العجلة</h3>
                    <p className="text-gray-400">راح تطلع لك وجبة للتحدي هنا</p>
                  </div>
              )}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-primary-600 mb-2">{filteredMeals.length}</div>
              <div className="text-gray-600">وجبة مناسبة للتحدي</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-secondary-600 mb-2">🔁</div>
              <div className="text-gray-600">أنشئ تحدي جديد</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-3xl font-bold text-success-600 mb-2">🤝</div>
              <div className="text-gray-600">تحدي ومرح مع أصحابك</div>
            </div>
          </div>
        </main>
      </div>
  );
}