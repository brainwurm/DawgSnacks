import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, (user as any).password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Login successful",
        userId: (user as any)._id.toString(),
        name: (user as any).name,
        email: (user as any).email,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/login:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

