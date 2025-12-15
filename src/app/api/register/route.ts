/* import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { MongoConnection } from "@/lib/db";
import { coworking } from "@/lib/models/user";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    // basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await MongoConnection();

    // check existing
    const existing = await coworking.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new coworking({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashed,
    });

    await user.save();

    return NextResponse.json({ message: "User created", user: { id: user._id, email: user.email, name: user.name } }, { status: 201 });

  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
 */

export {};