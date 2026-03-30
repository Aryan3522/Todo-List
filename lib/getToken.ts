import { login } from "@/lib/auth";

export async function getToken(email, password) {
    const user = await login(email, password);
    return user.user.getIdToken();
}