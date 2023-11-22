import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUser();
  if (user) {
    return NextResponse.json({
      message: "Hello user",
      id: user.id
    });
  }
  return
}
