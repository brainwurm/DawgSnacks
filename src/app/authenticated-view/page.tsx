
"use client";

import UserPost from "@/components/ui-elements/UserPost";
import Sidebar from "@/components/ui-elements/Sidebar";
import Card from "@/components/Card";
import Header from "@/components/ui-elements/Header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface UserPostType {
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
}

const dummyPosts: UserPostType[] = [
  {
    _id: "1",
    title: "Chocolate Chip Cookies",
    link: "/food_main.jpg",
    userId: "user1",
    likes: 42,
    dislikes: 2,
    numComments: 5,
    instructions:
      "Mix dry ingredients, add wet ingredients, bake at 350°F for 12 minutes",
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
    instructions:
      "Chop romaine lettuce, add croutons, parmesan, and dressing",
    ingredients: "Romaine Lettuce, Croutons, Parmesan, Caesar Dressing",
    servings: "4 servings",
    calories: 200,
    sugar: 2,
    cholesterol: 30,
    carbs: 12,
    fat: 15,
  },
];

export default function AuthenticatedHomePage() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<UserPostType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [currentUserName, setCurrentUserName] = useState<string | null>(null);

  // Load logged-in user name from localStorage (set on login)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("dawgsnacks_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrentUserName(parsed.name || null);
      } catch {
        // ignore JSON errors
      }
    }
  }, []);

  const displayName =
    currentUserName || (session?.user?.name as string | null) || "Dawg";

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/userPosts");

        if (!res.ok) {
          throw new Error("Failed to fetch posts: " + res.status);
        }

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          // No posts in DB yet -> show dummy content
          setPosts(dummyPosts);
        } else {
          setPosts(data as UserPostType[]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPostsError("Could not load posts. Showing sample content.");
        setPosts(dummyPosts);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header session={session || null} />

      <div className="flex min-h-screen bg-[#FDF5FF]">
        {/* Left sidebar */}
        <div className="sticky top-20 h-fit">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 m-1 ml-20 p-5">
          {/* Welcome banner */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome, {displayName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Explore recipes and snacks shared by other Dawgs, or post your
              own creations.
            </p>
          </div>

          {/* Optional error / loading messages */}
          {loadingPosts && (
            <p className="text-gray-500 mb-4">Loading posts...</p>
          )}
          {postsError && !loadingPosts && (
            <p className="text-red-500 mb-4">{postsError}</p>
          )}

          {/* Posts feed */}
          <div className="flex flex-col gap-4 max-w-4xl">
            {posts.map((post) => (
              <Card key={post._id}>
                <UserPost userPost={post} />
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
