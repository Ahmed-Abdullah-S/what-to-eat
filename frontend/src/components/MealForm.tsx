"use client";
import { useEffect, useState } from "react";

interface Option { id: number; name: string; }

export interface MealFormValues {
  name: string;
  description: string;
  price_level: string;
  emoji: string;
  category_id: number | null;
  cuisine_id: number | null;
  diet_ids: number[];
}

interface MealFormProps {
  initialValues?: Partial<MealFormValues>;
  onSubmit: (values: MealFormValues) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export default function MealForm({ initialValues = {}, onSubmit, onCancel, loading }: MealFormProps) {
  const [name, setName] = useState(initialValues.name || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [priceLevel, setPriceLevel] = useState(initialValues.price_level || "");
  const [emoji, setEmoji] = useState(initialValues.emoji || "");
  const [categoryId, setCategoryId] = useState<number | null>(initialValues.category_id ?? null);
  const [cuisineId, setCuisineId] = useState<number | null>(initialValues.cuisine_id ?? null);
  const [dietIds, setDietIds] = useState<number[]>(initialValues.diet_ids || []);

  const [categories, setCategories] = useState<Option[]>([]);
  const [cuisines, setCuisines] = useState<Option[]>([]);
  const [diets, setDiets] = useState<Option[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [catRes, cuiRes, dietRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/cuisines/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/diets/`),
        ]);
        setCategories(await catRes.json());
        setCuisines(await cuiRes.json());
        setDiets(await dietRes.json());
      } catch {
        setError("Failed to load options");
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !categoryId || !cuisineId) {
      setError("Name, category, and cuisine are required");
      return;
    }
    onSubmit({
      name,
      description,
      price_level: priceLevel,
      emoji,
      category_id: categoryId,
      cuisine_id: cuisineId,
      diet_ids: dietIds,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea className="w-full border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="block font-medium mb-1">Price Level</label>
        <select className="w-full border rounded px-3 py-2" value={priceLevel} onChange={e => setPriceLevel(e.target.value)}>
          <option value="">Select...</option>
          <option value="رخيص">رخيص</option>
          <option value="متوسط">متوسط</option>
          <option value="غالي">غالي</option>
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Emoji</label>
        <input className="w-full border rounded px-3 py-2" value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={2} />
      </div>
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select className="w-full border rounded px-3 py-2" value={categoryId ?? ""} onChange={e => setCategoryId(Number(e.target.value) || null)} required>
          <option value="">Select...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Cuisine</label>
        <select className="w-full border rounded px-3 py-2" value={cuisineId ?? ""} onChange={e => setCuisineId(Number(e.target.value) || null)} required>
          <option value="">Select...</option>
          {cuisines.map(cui => (
            <option key={cui.id} value={cui.id}>{cui.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-medium mb-1">Diets</label>
        <select multiple className="w-full border rounded px-3 py-2" value={dietIds.map(String)} onChange={e => setDietIds(Array.from(e.target.selectedOptions, o => Number(o.value)))}>
          {diets.map(diet => (
            <option key={diet.id} value={diet.id}>{diet.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" className="px-4 py-2 rounded border" onClick={onCancel}>Cancel</button>}
        <button type="submit" className="px-4 py-2 rounded bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
} 