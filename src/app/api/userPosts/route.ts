import { NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import UserPost from "@/models/userPostSchema";

// GET /api/userPosts  -> list all posts (newest first)
export async function GET() {
  try {
    await connectMongoDB();

    const posts = await UserPost.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(posts, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching user posts:", err);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/userPosts  -> create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      link,
      userId,
      instructions,
      ingredients,
      servings,
      calories,
      sugar,
      cholesterol,
      carbs,
      fat,
    }: {
      title: string;
      link?: string;
      userId: string;
      instructions?: string;
      ingredients?: string;
      servings?: string;
      calories?: number;
      sugar?: number;
      cholesterol?: number;
      carbs?: number;
      fat?: number;
    } = body;

    if (!title || !userId) {
      return NextResponse.json(
        { message: "title and userId are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const newPost = await UserPost.create({
      title,
      link: link || "",
      userId,
      instructions: instructions || "",
      ingredients: ingredients || "",
      servings: servings || "",
      calories,
      sugar,
      cholesterol,
      carbs,
      fat,
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

