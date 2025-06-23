'use client';

import { Meal } from '@/types/meal';
import { Heart, Star, MapPin } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  isFavorite: boolean;
  onToggleFavorite: (meal: Meal) => void;
  showActions?: boolean;
}

export default function MealCard({ meal, isFavorite, onToggleFavorite, showActions = true }: MealCardProps) {
  const getPriceColor = (priceLevel: string) => {
    switch (priceLevel) {
      case 'رخيص':
        return 'text-green-600 bg-green-100';
      case 'متوسط':
        return 'text-yellow-600 bg-yellow-100';
      case 'فاخر':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCuisineColor = (cuisine: string) => {
    const colors = [
      'text-blue-600 bg-blue-100',
      'text-red-600 bg-red-100',
      'text-green-600 bg-green-100',
      'text-purple-600 bg-purple-100',
      'text-orange-600 bg-orange-100',
      'text-pink-600 bg-pink-100',
      'text-indigo-600 bg-indigo-100',
    ];
    const index = cuisine.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Meal Image/Emoji */}
      <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-6xl">{meal.emoji}</div>
      </div>

      {/* Meal Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.name}</h3>
          {showActions && (
            <button
              onClick={() => onToggleFavorite(meal)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{meal.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriceColor(meal.priceLevel)}`}>
            💰 {meal.priceLevel}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCuisineColor(meal.cuisine)}`}>
            🌍 {meal.cuisine}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
            🥗 {meal.dietaryType}
          </span>
        </div>

        {/* Location and Rating */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {meal.location && (
            <div className="flex items-center space-x-1 space-x-reverse">
              <MapPin size={16} />
              <span>{meal.location}</span>
            </div>
          )}
          {meal.rating && (
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span>{meal.rating}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-3 space-x-reverse">
              <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium">
                عرض التفاصيل
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                جرب مرة أخرى
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}