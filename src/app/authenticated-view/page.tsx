"use client"
import UserPost from "@/components/ui-elements/UserPost";
import Sidebar from "@/components/ui-elements/Sidebar";
import Card from "@/components/Card";
import Header from "@/components/ui-elements/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UserPost {
    _id: string,
    title: string,
    link: string,
    userId: string,
    likes: number,
    dislikes: number,
    numComments: number,
    instructions: string,
    ingredients: string,
    servings: string,
    calories: number,
    sugar: number,
    cholesterol: number,
    carbs: number,
    fat: number,
}

export default function AuthenticatedHomePage() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<UserPost[]>([
        {
            _id: "1",
            title: "Chocolate Chip Cookies",
            link: "/food_main.jpg",
            userId: "user1",
            likes: 42,
            dislikes: 2,
            numComments: 5,
            instructions: "Mix dry ingredients, add wet ingredients, bake at 350°F for 12 minutes",
            ingredients: "Flour, Butter, Sugar, Eggs, Vanilla, Chocolate Chips",
            servings: "24 cookies",
            calories: 150,
            sugar: 12,
            cholesterol: 25,
            carbs: 18,
            fat: 8,
        },
        {
            _id: "2",
            title: "Caesar Salad",
            link: "/cooking-image.jpg",
            userId: "user2",
            likes: 28,
            dislikes: 1,
            numComments: 3,
            instructions: "Chop romaine lettuce, add croutons, parmesan, and dressing",
            ingredients: "Romaine Lettuce, Croutons, Parmesan, Caesar Dressing",
            servings: "4 servings",
            calories: 200,
            sugar: 2,
            cholesterol: 30,
            carbs: 12,
            fat: 15,
        },
    ]);

    //Initial loadup of user posts
    useEffect(() => {
        // Temporarily disabled to show mock posts
        /*
        const url = "/api/userPosts";
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error getting user posts! " + response.status);
                }
                const data = await response.json();
                data.reverse();
                setPosts(data);
            } catch (error) {
                console.error("Error getting user posts!", error);
            }
        }
        fetchData();
        */
    }, []);
    
    return(
        <>
            <Header session={session || null} />
            <div className="flex">
                <div className="sticky top-20">
                    <Sidebar />
                </div>
                <div className="flex-1 m-1 ml-20 p-5">
                    <div className="flex flex-col gap-1 max-w-4xl">
                        {posts.map((post) => (
                            <Card key={post._id}>
                                <UserPost userPost={post} />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* bubbles */}
            {/* bottom-left */}
            <div className = "fixed bottom-0 left-0 -translate-x-3/8 translate-y-3/8 h-90 w-90 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-30 left-0 -translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-0 left-40 translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            
            {/* top-right */}
            <div className = "fixed top-0 right-0 translate-x-1/4 h-80 w-80 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-45 right-0 translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-40 -translate-y-1/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-70 -translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-0 -translate-y-1/4 h-50 w-50 bg-black z-[-1]"></div>
        </>
    );
}