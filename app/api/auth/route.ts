import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  try {
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 400 });
    }

    // Verify Firebase token
    const decoded = await adminAuth?.verifyIdToken(token);
    console.log("decoded: ", decoded);

    return NextResponse.json({
      success: true,
      user: {
        uid: decoded.uid,
        email: decoded.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
