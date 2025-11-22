"use client"
import ModifyPost from "@/components/ModifyPost";
import { useEffect, useState } from "react";

type Post = {
    _id: string,
    userId: string,
    title: string,
    link: string,
    sugar: number,
    cholesterol: number,
    fat: number,
    carbs: number
    instructions: string,
    ingredients: string,
    servings: string
    calories: number
}

export default function EditPost({ params } : { params: Promise<{ id: string }> | { id: string } }) {
    const [post, setPost] = useState<Post>();

    const getPost = async (p: Promise<{ id: string }> | { id: string }) => {
        let postId: string;

        // Unpack the Promise if it is one
        if (p instanceof Promise) {
            postId = (await p).id;
        } else {
            postId = p.id;
        }
        
        try {
            const response = await fetch(`/api/userPosts/${postId}`);
            if (!response.ok) {
                throw new Error("Error getting the user post!");
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            alert(error);
        }
    }
    
    // Handler for the form submission (for updating the post)
    const handleEditSubmit = (formData: Post) => {
        // TODO: Implement the API call to update the post using formData and post._id
        console.log("Submitting edit:", formData);
        alert("Edit submitted. Check console for data.");
    };

    useEffect(() => {
        // We only call getPost once when the component mounts
        getPost(params);
    }, [params]);
 
    return (
        <div className="min-h-screen bg-linear-to-br from-[#4C1B7A] via-[#3B0270] to-[#2D0157] text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
            
            {post ? (
                <ModifyPost 
                    initialData={{
                        title: post.title,
                        link: post.link,
                        instructions: post.instructions,
                        ingredients: post.ingredients,
                        servings: post.servings,
                        calories: post.calories,
                        sugar: post.sugar,
                        cholesterol: post.cholesterol,
                        carbs: post.carbs,
                        fat: post.fat,
                    }} 
                    onSubmit={handleEditSubmit}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
