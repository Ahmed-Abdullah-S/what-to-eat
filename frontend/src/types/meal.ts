export interface Meal {
  id: string;
  name: string;
  description: string;
  cuisine: CuisineType;
  priceLevel: PriceLevel;
  dietaryType: DietaryType;
  imageUrl?: string;
  emoji: string;
  location?: string;
  rating?: number;
}

export type CuisineType = 
  | 'سعودي'
  | 'شامي'
  | 'ياباني'
  | 'أمريكي'
  | 'إيطالي'
  | 'هندي'
  | 'مكسيكي'
  | 'صيني'
  | 'كوري'
  | 'تركي'
  | 'لبناني'
  | 'مصري'
  | 'عربي'
  | 'فلسطيني'
  | 'يوناني';

export type PriceLevel = 
  | 'رخيص' // ١٠–٢٥ ريال
  | 'متوسط' // ٢٥–٥٠ ريال
  | 'فاخر'; // ٥٠+ ريال

export type DietaryType = 
  | 'عادي'
  | 'نباتي'
  | 'نباتي صرف'
  | 'صحي'
  | 'حلال'
  | 'خالي من الغلوتين';

export interface FilterOptions {
  priceLevel?: PriceLevel;
  cuisine?: CuisineType;
  dietaryType?: DietaryType;
}

export interface Challenge {
  id: string;
  filters: FilterOptions;
  createdAt: Date;
  result?: Meal;
  isCompleted: boolean;
} 