import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
      firstName,
      lastName,
      username,
    }: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
      username?: string;
    } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Check for existing user
    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const name =
      username ||
      [firstName, lastName].filter(Boolean).join(" ") ||
      email.split("@")[0];

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: newUser._id.toString(),
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "Users endpoint ok" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}

