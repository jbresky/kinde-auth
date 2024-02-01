import { NextRequest } from "next/server";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
    params: {
        kindeAuth: string
    }
}

export async function GET(request: NextRequest, { params }: Props) {
    const endpoint = params.kindeAuth
    return handleAuth(request, endpoint)
}


