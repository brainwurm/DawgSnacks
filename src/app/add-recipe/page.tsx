"use client";
import ModifyPost from "@/components/ModifyPost"

// Handler for the form submission for adding a new post
const handleAddSubmit = (formData: any) => {
    // TODO: Implement the API call here to create a new post using formData
    console.log("Submitting new recipe:", formData);
    
    // send data to API here
    
    alert("Recipe submission successful. Check console for data.");
};

export default function AddRecipePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Add Recipe</h1>
      
      <ModifyPost onSubmit={handleAddSubmit}/>
    </div>
  );
}
