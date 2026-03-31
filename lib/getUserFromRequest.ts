import { NextRequest } from "next/server";
import { adminAuth } from "./firebaseAdmin";

export async function getUserFromRequest(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid; // userId
}