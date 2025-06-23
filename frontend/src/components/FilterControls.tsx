'use client';

import { useState } from 'react';
import { FilterOptions } from '@/types/meal';
import { ChevronDown, X } from 'lucide-react';

interface FilterControlsProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const priceOptions = [
  { value: 'رخيص', label: '💰 رخيص (١٠–٢٥ ريال)' },
  { value: 'متوسط', label: '💰💰 متوسط (٢٥–٥٠ ريال)' },
  { value: 'فاخر', label: '💰💰💰 فاخر (٥٠+ ريال)' },
];

const cuisineOptions = [
  { value: 'سعودي', label: '🇸🇦 سعودي' },
  { value: 'شامي', label: '🇸🇾 شامي' },
  { value: 'ياباني', label: '🇯🇵 ياباني' },
  { value: 'أمريكي', label: '🇺🇸 أمريكي' },
  { value: 'إيطالي', label: '🇮🇹 إيطالي' },
  { value: 'هندي', label: '🇮🇳 هندي' },
  { value: 'مكسيكي', label: '🇲🇽 مكسيكي' },
  { value: 'صيني', label: '🇨🇳 صيني' },
  { value: 'تركي', label: '🇹🇷 تركي' },
  { value: 'فلسطيني', label: '🇵🇸 فلسطيني' },
  { value: 'يوناني', label: '🇬🇷 يوناني' },
];

const dietaryOptions = [
  { value: 'عادي', label: '🍽️ عادي' },
  { value: 'نباتي', label: '🥗 نباتي' },
  { value: 'نباتي صرف', label: '🌱 نباتي صرف' },
  { value: 'صحي', label: '🥑 صحي' },
  { value: 'حلال', label: '☪️ حلال' },
];

export default function FilterControls({ filters, onFiltersChange }: FilterControlsProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const updateFilter = (key: keyof FilterOptions, value: string | undefined) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value as any;
    } else {
      delete newFilters[key];
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔍 تصفية الوجبات</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1 space-x-reverse"
          >
            <X size={16} />
            <span>مسح الكل</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {filters.priceLevel ? `💰 ${filters.priceLevel}` : '💰 السعر'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {openFilter === 'price' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {priceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFilter('priceLevel', filters.priceLevel === option.value ? undefined : option.value);
                    setOpenFilter(null);
                  }}
                  className={`w-full text-right p-3 hover:bg-gray-50 transition-colors ${
                    filters.priceLevel === option.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cuisine Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'cuisine' ? null : 'cuisine')}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {filters.cuisine ? `🌍 ${filters.cuisine}` : '🌍 المطبخ'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {openFilter === 'cuisine' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {cuisineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFilter('cuisine', filters.cuisine === option.value ? undefined : option.value);
                    setOpenFilter(null);
                  }}
                  className={`w-full text-right p-3 hover:bg-gray-50 transition-colors ${
                    filters.cuisine === option.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dietary Filter */}
        <div className="relative">
          <button
            onClick={() => setOpenFilter(openFilter === 'dietary' ? null : 'dietary')}
            className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {filters.dietaryType ? `🥗 ${filters.dietaryType}` : '🥗 النمط الغذائي'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {openFilter === 'dietary' && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {dietaryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFilter('dietaryType', filters.dietaryType === option.value ? undefined : option.value);
                    setOpenFilter(null);
                  }}
                  className={`w-full text-right p-3 hover:bg-gray-50 transition-colors ${
                    filters.dietaryType === option.value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.priceLevel && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                💰 {filters.priceLevel}
                <button
                  onClick={() => updateFilter('priceLevel', undefined)}
                  className="mr-2 ml-1 hover:text-primary-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.cuisine && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-800">
                🌍 {filters.cuisine}
                <button
                  onClick={() => updateFilter('cuisine', undefined)}
                  className="mr-2 ml-1 hover:text-secondary-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.dietaryType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-success-100 text-success-800">
                🥗 {filters.dietaryType}
                <button
                  onClick={() => updateFilter('dietaryType', undefined)}
                  className="mr-2 ml-1 hover:text-success-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}