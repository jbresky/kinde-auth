import { BASE_URL } from "@/constant/url";
import User from "@/models/User";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession()

    const user: any = getUser()

    if (!user || user == null || !user.id) {
        throw new Error("authentication failed", user)
    }

    const userAuth = await User.find({ user })

    if (!userAuth) {
        await User.create({
            id: user.id,
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email
        })
    }

    return NextResponse.redirect(BASE_URL)
}
