"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Meal {
  id: number;
  name: string;
  description: string;
  emoji: string;
  price_level: string;
  cuisine: string;
  dietary_type: string;
  location?: string;
  rating?: number;
  picked_count: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    const fetchMeals = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch meals");
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        setError("Could not load meals. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow p-8 mt-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-8 text-gray-600">Manage meals, categories, and more.</p>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mb-4">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Emoji</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Cuisine</th>
                  <th className="p-2 border">Dietary Type</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Rating</th>
                  <th className="p-2 border">Picked Count</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meals.map(meal => (
                  <tr key={meal.id} className="hover:bg-gray-50">
                    <td className="p-2 border text-xl">{meal.emoji}</td>
                    <td className="p-2 border font-semibold">{meal.name}</td>
                    <td className="p-2 border">{meal.description}</td>
                    <td className="p-2 border">{meal.price_level}</td>
                    <td className="p-2 border">{meal.cuisine}</td>
                    <td className="p-2 border">{meal.dietary_type}</td>
                    <td className="p-2 border">{meal.location || '-'}</td>
                    <td className="p-2 border">{meal.rating ?? '-'}</td>
                    <td className="p-2 border">{meal.picked_count}</td>
                    <td className="p-2 border text-center">
                      <button className="text-blue-600 hover:underline mr-2" disabled>Edit</button>
                      <button className="text-red-600 hover:underline" disabled>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 