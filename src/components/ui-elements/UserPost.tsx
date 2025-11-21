import React from 'react';

interface UserPostProps {
  userPost: {
    _id: string;
    title: string;
    link: string;
    userId: string;
    likes: number;
    dislikes: number;
    numComments: number;
    instructions: string;
    ingredients: string;
    servings: string;
    calories: number;
    sugar: number;
    cholesterol: number;
    carbs: number;
    fat: number;
  };
}

export default function UserPost({ userPost }: UserPostProps) {
  return (
    <div className="text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{userPost.title}</h3>
          <p className="text-gray-300 text-sm mb-2">{userPost.link}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <p><strong>Servings:</strong> {userPost.servings}</p>
        <p><strong>Ingredients:</strong> {userPost.ingredients}</p>
        <p><strong>Instructions:</strong> {userPost.instructions}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <p><strong>Calories:</strong> {userPost.calories}</p>
        <p><strong>Sugar:</strong> {userPost.sugar}g</p>
        <p><strong>Cholesterol:</strong> {userPost.cholesterol}mg</p>
        <p><strong>Carbs:</strong> {userPost.carbs}g</p>
        <p><strong>Fat:</strong> {userPost.fat}g</p>
      </div>

      <div className="flex gap-4 items-center pt-4 border-t border-gray-500">
        <button className="flex items-center gap-2 text-gray-300 hover:text-[#FCD34D] transition">
          <img src="/thumbs_up_icon.svg" alt="Like" className="w-4 h-4" />
          <span>{userPost.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-300 hover:text-[#FCD34D] transition">
          <img src="/thumb_down_icon.svg" alt="Dislike" className="w-4 h-4" />
          <span>{userPost.dislikes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-300 hover:text-[#FCD34D] transition">
          <img src="/comment_icon.svg" alt="Comment" className="w-4 h-4" />
          <span>{userPost.numComments}</span>
        </button>
      </div>
    </div>
  );
}
