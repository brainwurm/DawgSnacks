import ModifyPost from "@/components/ModifyPost"

export default function AddRecipePage() {
  return (
     <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Add Recipe</h1>
    <ModifyPost editPost = {false}/>
    </div>
  );
}
