import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/users";
import { connectDB } from "@/lib/mongoose";

export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();

  if (!password || password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  if (!fullname) {
    return NextResponse.json(
      { message: "Fullname is required" },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  console.log(fullname, email, password);

  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullname, email, password: hashedPassword });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json(savedUser);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
