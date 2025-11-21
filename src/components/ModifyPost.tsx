import React from 'react';

interface ModifyPostProps {
  initialData?: {
    title: string;
    link: string;
    instructions: string;
    ingredients: string;
    servings: string;
    calories: number;
    sugar: number;
    cholesterol: number;
    carbs: number;
    fat: number;
  };
  onSubmit: (data: any) => void;
}

export default function ModifyPost({ initialData, onSubmit }: ModifyPostProps) {
  const [formData, setFormData] = React.useState(initialData || {
    title: '',
    link: '',
    instructions: '',
    ingredients: '',
    servings: '',
    calories: 0,
    sugar: 0,
    cholesterol: 0,
    carbs: 0,
    fat: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('calories') || name.includes('sugar') || name.includes('cholesterol') || name.includes('carbs') || name.includes('fat') ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        name="link"
        placeholder="Recipe Link"
        value={formData.link}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        required
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        required
      />
      <input
        type="text"
        name="servings"
        placeholder="Servings"
        value={formData.servings}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          className="px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        />
        <input
          type="number"
          name="sugar"
          placeholder="Sugar (g)"
          value={formData.sugar}
          onChange={handleChange}
          className="px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        />
        <input
          type="number"
          name="cholesterol"
          placeholder="Cholesterol (mg)"
          value={formData.cholesterol}
          onChange={handleChange}
          className="px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        />
        <input
          type="number"
          name="carbs"
          placeholder="Carbs (g)"
          value={formData.carbs}
          onChange={handleChange}
          className="px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        />
        <input
          type="number"
          name="fat"
          placeholder="Fat (g)"
          value={formData.fat}
          onChange={handleChange}
          className="px-4 py-2 bg-[#3B0270] border border-gray-500 rounded text-white placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2 bg-[#FCD34D] text-[#4C1B7A] font-semibold rounded hover:bg-yellow-300 transition"
      >
        Submit
      </button>
    </form>
  );
}
