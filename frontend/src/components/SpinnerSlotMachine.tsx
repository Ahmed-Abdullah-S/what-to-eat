'use client';

import {useEffect, useRef, useState} from 'react';
import {Meal} from '@/types/meal';

interface SpinnerSlotMachineProps {
    meals: Meal[];
    onSpin: () => void;
    onSpinComplete: (meal: Meal) => void;
}

export default function SpinnerSlotMachine({
                                               meals,
                                               onSpin,
                                               onSpinComplete,
                                           }: SpinnerSlotMachineProps) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [visibleItems, setVisibleItems] = useState<Meal[]>([]);
    const [hasSpunOnce, setHasSpunOnce] = useState(false);
    const [spinKey, setSpinKey] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const previousMealRef = useRef<Meal | null>(null);

    const spinDuration = 4300;
    const loopCount = 4;
    const itemHeight = 96;

    const shuffleMeals = (meals: Meal[]): Meal[] => {
        return [...meals].sort(() => Math.random() - 0.5);
    };

    const playSpinSound = () => {
        const audio = new Audio('/sounds/slot-spin.mp3');
        audio.play().catch(() => {
        });
    };

    const playWinSound = () => {
        const audio = new Audio('/sounds/win.mp3');
        audio.volume = 0.4;
        audio.play().catch(() => {
        });
    };

    const handleSpin = () => {
        if (isSpinning || meals.length === 0) return;

        onSpin();
        setIsSpinning(true);
        setHasSpunOnce(true);
        playSpinSound();

        let shuffledMeals = shuffleMeals(meals);
        let selectedMeal = shuffledMeals[Math.floor(Math.random() * shuffledMeals.length)];

        while (selectedMeal.id === previousMealRef.current?.id && shuffledMeals.length > 1) {
            selectedMeal = shuffledMeals[Math.floor(Math.random() * shuffledMeals.length)];
        }

        previousMealRef.current = selectedMeal;

        const repeated = Array(loopCount).fill(shuffledMeals).flat();
        const finalItems = [...repeated, selectedMeal];

        setVisibleItems(finalItems);
        setSpinKey((prev) => prev + 1);

        requestAnimationFrame(() => {
            if (containerRef.current) {
                containerRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.1, 0.57, 0.1, 1)`;
                containerRef.current.style.transform = `translateY(-${(finalItems.length - 1) * itemHeight}px)`;
            }
        });

        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.transition = 'none';
                containerRef.current.style.transform = `translateY(-${(finalItems.length - 1) * itemHeight}px)`;
                void containerRef.current.offsetHeight;
            }

            setIsSpinning(false);
            onSpinComplete(selectedMeal);
            playWinSound();
        }, spinDuration);
    };

    return (
        <div className="flex flex-col items-center">
            {meals.length === 0 ? (
                <div className="text-center text-gray-600 py-10 flex flex-col items-center space-y-3">
                    <div className="text-4xl">🍽️😅</div>
                    <p className="text-xl font-semibold">لا توجد وجبات حالياً</p>
                    <p className="text-sm text-gray-500">🧭 جرب تعديل الفلاتر لإظهار خيارات لذيذة!</p>
                </div>
            ) : (
                <>
                    <div
                        className="w-72 h-24 relative overflow-hidden border-[2px] border-orange-200 rounded-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-inner"
                        style={{
                            boxShadow:
                                'rgba(50, 50, 93, 0.15) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.1) 0px 18px 36px -18px inset',
                        }}
                    >
                        {/* Top and bottom fade effect (glass mask) */}
                        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
                            <div
                                className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/70 to-transparent rounded-t-xl"/>
                            <div
                                className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl"/>
                        </div>

                        {/* Placeholder when idle */}
                        {!isSpinning && !hasSpunOnce && (
                            <div
                                className="absolute inset-0 z-20 flex items-center justify-center text-orange-400 font-semibold text-xl animate-pulse select-none">
                                🍽️ وش آكل اليوم؟
                            </div>
                        )}

                        {/* Spinner content */}
                        <div
                            key={spinKey}
                            ref={containerRef}
                            className="flex flex-col z-0"
                            style={{willChange: 'transform'}}
                        >
                            {visibleItems.map((meal, i) => (
                                <div
                                    key={`${meal.id}-${i}`}
                                    className="h-24 flex items-center justify-center text-2xl font-extrabold tracking-wide text-orange-700"
                                >
                                    {meal.emoji} <span className="ml-2">{meal.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Center highlight (optional gloss) */}
                        <div
                            className="pointer-events-none absolute top-0 left-0 w-full h-24 border-y-[4px] border-orange-400 bg-gradient-to-b from-white/60 via-transparent to-white/60 z-10"/>
                    </div>

                    <button
                        onClick={handleSpin}
                        disabled={isSpinning}
                        className={`mt-6 px-6 py-3 rounded-xl text-white font-bold text-lg transition-all duration-200 shadow-lg ${
                            isSpinning
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                        }`}
                    >
                        {isSpinning ? '🎲 جاري التدوير...' : '🎰 ابدأ العجلة!'}
                    </button>
                </>
            )}
        </div>
    );
}
